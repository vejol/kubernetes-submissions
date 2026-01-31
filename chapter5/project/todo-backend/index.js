import "dotenv/config"
import express from "express"

import { addTodo, getTodos, initializeDb, setTodoDone, pool } from "./db.js"
import { connect, StringCodec } from "nats"

const PORT = process.env.PORT
const NATS_URL = process.env.NATS_URL

const nc = await connect({ servers: NATS_URL })
const sc = StringCodec()

initializeDb()

const app = express()

app.use(express.json())

app.get("/", (request, response) => {
  response.status(200).json({ status: "ok" })
})

app.get("/readyz", async (request, response) => {
  try {
    await pool.query("SELECT 1")
    response.status(200).send("ok")
  } catch (error) {
    console.error("DB not reachable", error)
    response.status(503).send("db not ready")
  }
})

app.get("/todos", async (request, response) => {
  const todos = await getTodos()
  response.json(todos)
})

app.post("/todos", async (request, response) => {
  const maxLength = 140
  const content = request.body.content

  if (content.length > maxLength) {
    console.warn(`Rejected todo (too long): ${content}`)
    return response.status(413).json({
      error: `Content too long, the max length is ${maxLength} chars. Received content: ${content}`,
      maxLength,
      actualLength: content.length,
    })
  }

  console.log(`Received todo: ${content}`)

  const addedTodo = await addTodo(content)

  nc.publish(
    "todo_created",
    sc.encode(`A Todo was created: \n\n${JSON.stringify(addedTodo)}`),
  )
  await nc.flush()

  response.status(201).json(addedTodo)
})

app.put("/todos/:id", async (request, response) => {
  const id = request.params.id
  const updatedTodo = await setTodoDone(id)

  nc.publish(
    "todo_updated",
    sc.encode(`A Todo was updated: \n\n${JSON.stringify(addedTodo)}`),
  )
  await nc.flush()

  response.json(updatedTodo)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
