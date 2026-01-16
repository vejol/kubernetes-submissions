const express = require("express")

let counterValue = 0

const app = express()
const PORT = process.env.PORT || 3000

app.get("/pingpong", (request, response) => {
  response.send(`pong ${counterValue}`)
  counterValue += 1
})

app.get("/pings", (request, response) => {
  response.json({ pings: counterValue })
})

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
