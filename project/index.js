const axios = require("axios")
const express = require("express")
const fs = require("fs")
const path = require("path")

const directory = path.join(__dirname, "public", "images")
const filePath = path.join(directory, "image.jpg")
const imageUrl = "https://picsum.photos/1200"

const getNewImage = async () => {
  const response = await axios.get(imageUrl, { responseType: "stream" })
  await response.data.pipe(fs.createWriteStream(filePath))
}

fs.mkdirSync(directory, { recursive: true })

if (!fs.existsSync(filePath)) {
  getNewImage()
}

setInterval(async () => {
  getNewImage()
}, 600000) // 600000ms=10m

const app = express()
const PORT = process.env.PORT || 3000

app.use("/public", express.static(path.join(__dirname, "public")))

app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "index.html"))
})

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
