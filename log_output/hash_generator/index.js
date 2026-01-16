require("dotenv").config()
const path = require("path")
const { writeFile, mkdirSync } = require("fs")

const HASH_FILE_PATH = process.env.HASH_FILE_PATH

try {
  mkdirSync(path.dirname(HASH_FILE_PATH), { recursive: true })
} catch (err) {
  console.error("Error creating directory", err)
}

const generateHashLine = () => {
  const currentDate = new Date().toISOString()
  const randomHash = crypto.randomUUID()
  return `${currentDate}: ${randomHash}`
}

const updateHashLine = () => {
  writeFile(HASH_FILE_PATH, generateHashLine(), err => {
    if (err) {
      console.error("Error writing to file", err)
    }
  })
}

setInterval(updateHashLine, 5000)
