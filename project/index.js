const express = require("express")
const path = require("path")

const app = express()
const PORT = process.env.PORT || 3000

app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "index.html"))
})

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
