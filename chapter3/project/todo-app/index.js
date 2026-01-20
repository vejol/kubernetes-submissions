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

console.log("api proxy target", API_PROXY_TARGET)

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

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
