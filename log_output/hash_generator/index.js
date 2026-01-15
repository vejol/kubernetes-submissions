const path = require("path")
const { writeFile, mkdirSync } = require("fs")

const directory = path.join("/", "app", "files")
const filePath = path.join(directory, "hash.txt")

mkdirSync(directory, { recursive: true }, err => {
  if (err) {
    console.error("Error creating directory", err)
  }
})

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
