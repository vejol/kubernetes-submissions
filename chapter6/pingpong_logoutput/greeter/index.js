const express = require("express")

const app = express()
const PORT = process.env.PORT || 8080

app.get("/", (req, res) => {
  // vesajo/greeter:v1 responds with "Hello from version 1"
  // vesajo/greeter:v2 responds with "Hello from version 2"
  res.send("Hello from version 2")
})

app.listen(PORT, () => {
  console.log(`Server is listening port ${PORT}`)
})
