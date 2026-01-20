require("dotenv").config()
const express = require("express")

const PORT = process.env.PORT

const todos = [
  { content: "Learn JavaScript" },
  { content: "Learn React" },
  { content: "Build a project" },
]

const app = express()

app.use(express.json())

app.get("/todos", (request, response) => {
  response.json(todos)
})

app.post("/todos", (request, response) => {
  const todo = request.body

  todos.push(todo)
  response.status(201).json(todo)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
