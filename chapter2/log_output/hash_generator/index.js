const path = require("path")
const { writeFile, mkdirSync } = require("fs")

const directory = path.join("/", "app", "hash")
const filePath = path.join(directory, "hash.txt")

try {
  mkdirSync(directory, { recursive: true })
} catch (err) {
  console.error("Error creating directory", err)
}

const generateHashLine = () => {
  const currentDate = new Date().toISOString()
  const hash = crypto.randomUUID()
  return `${currentDate}: ${hash}`
}

setInterval(() => {
  writeFile(filePath, generateHashLine(), err => {
    if (err) {
      console.error("Error writing to file", err)
    }
  })
}, 5000)
