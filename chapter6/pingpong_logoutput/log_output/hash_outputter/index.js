require("dotenv").config()
const axios = require("axios")
const express = require("express")
const { readFileSync } = require("fs")

const PING_PONG_URL = process.env.PING_PONG_URL
const HASH_FILE_PATH = process.env.HASH_FILE_PATH
const INFO_FILE_PATH = process.env.INFO_FILE_PATH
const MESSAGE = process.env.MESSAGE
const PORT = process.env.PORT

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

const readInfoFile = () => {
  try {
    return readFileSync(INFO_FILE_PATH, "utf8")
  } catch (err) {
    console.error("Error reading hash file:", err)
  }
}

const app = express()

app.get("/", async (request, response) => {
  const hash = readHash() || "no hash available"
  const count = (await getPingCount()) ?? "no ping count found"
  const infoFileContent = readInfoFile() || "no info file content available"

  const logOutputMessage = `
file content: ${infoFileContent}
env variable: MESSAGE=${MESSAGE}
${hash}
Ping / Pongs: ${count}
  `
  response.type("text/plain").send(logOutputMessage)
})

app.get("/readyz", async (request, response) => {
  try {
    await axios.get(`${PING_PONG_URL}/readyz`, { timeout: 2000 })
    response.status(200).send("ok")
  } catch {
    response.status(503).json({
      status: "not ready",
      reason: "dependency unavailable",
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
