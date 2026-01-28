require("dotenv").config()
const express = require("express")
const { createProxyMiddleware } = require("http-proxy-middleware")
const path = require("path")

const startImageLoader = require("./imageLoader")

const API_PROXY_TARGET = process.env.API_PROXY_TARGET
const PORT = process.env.PORT
const isDev = process.env.NODE_ENV === "development"

startImageLoader()

const app = express()

if (isDev) {
  const proxyMiddleware = createProxyMiddleware({
    pathFilter: "/todos",
    target: API_PROXY_TARGET,
    changeOrigin: true,
  })

  app.use(proxyMiddleware)
}

app.use("/public", express.static(path.join(__dirname, "public")))

app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "/public/index.html"))
})

app.get("/healthz", async (request, response) => {
  try {
    await axios.get(`/todos/healthz`, { timeout: 2000 })
    response.status(200).send("ok")
  } catch {
    response.status(503).json({
      status: "not ready",
      reason: "backend not healthy",
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
