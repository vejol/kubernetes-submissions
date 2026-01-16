const express = require("express")
const { writeFile, mkdirSync, readFileSync } = require("fs")
const path = require("path")

const directory = path.join("/", "app", "files")
const filePath = path.join(directory, "count.txt")

mkdirSync(directory, { recursive: true }, err => {
  if (err) {
    console.error("Error creating directory", err)
  }
})

const readCounterValue = () => {
  try {
    return readFileSync(filePath, "utf8")
  } catch (err) {
    console.error("Error reading hash file:", err)
  }
}

const writeCounterValue = newValue => {
  writeFile(filePath, newValue, err => {
    if (err) {
      console.error("Error writing to file", err)
    }
  })
}

writeCounterValue("0") // initialize counter value

const app = express()
const PORT = process.env.PORT || 3000

app.get("/pingpong", (request, response) => {
  const counterValue = readCounterValue()
  response.send(`pong ${counterValue}`)
  newValue = String(Number(counterValue) + 1)
  writeCounterValue(newValue)
})

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
