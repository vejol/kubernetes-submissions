require("dotenv").config()
const express = require("express")

const { addTodo, getTodos, initializeDb } = require("./db")

const PORT = process.env.PORT

initializeDb()

const app = express()

app.use(express.json())

app.get("/", (request, response) => {
  response.json({ status: "ok" })
})

app.get("/todos/healthz", (request, response) => {
  response.status(200).send("ok")
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
  response.status(201).json(addedTodo)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
