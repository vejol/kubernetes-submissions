const express = require("express")
const { readFileSync } = require("fs")
const path = require("path")

const hashFilePath = path.join("/app", "hash", "hash.txt")
const countFilePath = path.join("/app", "files", "count.txt")

const readHash = () => {
  try {
    return readFileSync(hashFilePath, "utf8")
  } catch (err) {
    console.error("Error reading hash file:", err)
  }
}

const readCount = () => {
  try {
    return readFileSync(countFilePath, "utf8")
  } catch (err) {
    console.error("Error reading count file:", err)
  }
}

const app = express()
const PORT = process.env.PORT || 3000

app.get("/", (request, response) => {
  const hash = readHash() || "no hash available"
  const count = readCount() || "no count found"
  response.type("text/plain").send(`${hash}\nPing / Pongs: ${count}`)
})

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
