require("dotenv").config()
const axios = require("axios")
const express = require("express")
const { createProxyMiddleware } = require("http-proxy-middleware")

const startImageLoader = require("./imageLoader")

const BACKEND_URL = process.env.BACKEND_URL
const PORT = process.env.PORT
const isDev = process.env.NODE_ENV === "development"

startImageLoader()

const app = express()

if (isDev) {
  const proxyMiddleware = createProxyMiddleware({
    pathFilter: "/todos",
    target: BACKEND_URL,
    changeOrigin: true,
  })
  app.use(proxyMiddleware)
}

app.use(express.static("dist"))

app.get("/readyz", async (request, response) => {
  try {
    await axios.get(`${BACKEND_URL}/readyz`, { timeout: 2000 })
    response.status(200).send("ok")
  } catch (error) {
    console.log("Backend availability check failed", error)
    response.status(503).json({
      status: "not ready",
      reason: "backend not healthy",
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
