const express = require("express")
const { readFileSync } = require("fs")
const path = require("path")

const filePath = path.join("/app", "files", "hash.txt")

const readHash = () => {
  try {
    return readFileSync(filePath, "utf8")
  } catch (err) {
    console.error("Error reading hash file:", err)
  }
}

const app = express()
const PORT = process.env.PORT || 3000

app.get("/", (request, response) => {
  const hash = readHash() || "no hash available"
  response.type("text/plain").send(hash)
})

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
