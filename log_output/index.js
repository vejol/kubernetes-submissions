const express = require("express")

let currentHashLine = ""

const updateHashLine = () => {
  const currentDate = new Date().toISOString()
  const hash = crypto.randomUUID()
  currentHashLine = `${currentDate}: ${hash}`
  console.log(currentHashLine)
}

updateHashLine()
setInterval(updateHashLine, 5000)

const app = express()
const PORT = process.env.PORT || 3000

app.get("/", (request, response) => {
  response.type("text/plain").send(currentHashLine)
})

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
