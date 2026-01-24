require("dotenv").config()
const express = require("express")

const { incrementCounterValue, getCounterValue, initializeDb } = require("./db")

const PORT = process.env.PORT || 3000

initializeDb()

const app = express()

app.get("/", async (request, response) => {
  const counterValue = await incrementCounterValue()
  response.send(`pong ${counterValue}`)
})

app.get("/pings", async (request, response) => {
  const counterValue = await getCounterValue()
  response.json({ pings: counterValue })
})

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
