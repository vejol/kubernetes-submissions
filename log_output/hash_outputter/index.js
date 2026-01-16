require("dotenv").config()
const axios = require("axios")
const express = require("express")
const { readFileSync } = require("fs")

const PING_PONG_URL = process.env.PING_PONG_URL
const HASH_FILE_PATH = process.env.HASH_FILE_PATH
const PORT = process.env.PORT || 3001

const readHash = () => {
  try {
    return readFileSync(HASH_FILE_PATH, "utf8")
  } catch (err) {
    console.error("Error reading hash file:", err)
  }
}

const getPingCount = async () => {
  try {
    const response = await axios.get(`${PING_PONG_URL}/pings`)
    return response.data.pings
  } catch (err) {
    console.error("Error while fetching count:", err)
  }
}

const app = express()

app.get("/", async (request, response) => {
  const hash = readHash() || "no hash available"
  const count = (await getPingCount()) ?? "no ping count found"
  response.type("text/plain").send(`${hash}\nPing / Pongs: ${count}`)
})

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
