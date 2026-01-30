require("dotenv").config()
const express = require("express")

const {
  incrementCounterValue,
  getCounterValue,
  initializeDb,
  pool,
} = require("./db")

const PORT = process.env.PORT

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

app.get("/healthz", (request, response) => {
  response.status(200).send("ok")
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

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
