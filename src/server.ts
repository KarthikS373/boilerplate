import { createServer } from "http"
import mongoose from "mongoose"

import app from "./config/app"
import env from "./config/env"

import unexpectedErrorHandler from "./utils/unexpectedErrorHandler"

const server = createServer(app)

mongoose.connect(env.mongoose.url).then(async () => {
  console.log(`Connected to database`)

  server.listen(env.port, () => {
    console.log(`Server started at ${env.base.url}/${env.base.version}`)
  })
})

process.on("uncaughtException", (error) => unexpectedErrorHandler(server, error))
process.on("unhandledRejection", (error) => unexpectedErrorHandler(server, error))
