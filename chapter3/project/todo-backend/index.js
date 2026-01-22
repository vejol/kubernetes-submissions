require("dotenv").config()
const express = require("express")

const { addTodo, getTodos, initializeDb } = require("./db")

const PORT = process.env.PORT

initializeDb()

const app = express()

app.use(express.json())

app.get("/todos", async (request, response) => {
  const todos = await getTodos()
  response.json(todos)
})

app.post("/todos", async (request, response) => {
  const content = request.body.content
  const addedTodo = await addTodo(content)
  response.status(201).json(addedTodo)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
