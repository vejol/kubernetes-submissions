const axios = require("axios")
const fs = require("fs")
const path = require("path")

const IMAGE_URL = process.env.IMAGE_URL
const IMAGE_FILE_PATH = process.env.IMAGE_FILE_PATH
const IMAGE_REFRESH_INTERVAL_MS = process.env.IMAGE_REFRESH_INTERVAL_MS

const getNewImage = async () => {
  const response = await axios.get(IMAGE_URL, { responseType: "stream" })
  await response.data.pipe(fs.createWriteStream(IMAGE_FILE_PATH))
}

const initializeImageDirectory = () => {
  try {
    fs.mkdirSync(path.dirname(IMAGE_FILE_PATH), { recursive: true })
  } catch (err) {
    console.error(`Error creating directory '${IMAGE_FILE_PATH}'`, err)
  }
}

const startImageLoader = () => {
  initializeImageDirectory()

  const imageExists = fs.existsSync(IMAGE_FILE_PATH)

  if (!imageExists) {
    getNewImage()
  }

  setInterval(getNewImage, IMAGE_REFRESH_INTERVAL_MS)
}

module.exports = startImageLoader
