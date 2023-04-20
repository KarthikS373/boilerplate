import mongoose from "mongoose"

import app from "./config/app.js"
import env from "./config/env.js"
import logger from "./config/logger.js"

import unexpectedErrorHandler from "./utils/unexpectedErrorHandler.js"

let server = null

/* Connect Mongo DB */
mongoose
  .connect(env.mongoose.url, env.mongoose.options)
  .then(() => {
    logger.info("MongoDB connected")

    server = app.listen(env.port, () => {
      logger.info(`Server started on port ${env.base.url}`)
    })
  })
  .catch((err) => {
    logger.error(`An error occured connecting to DB: ${err}`)
  })

/* Handle Exceptions */
process.on("uncaughtException", unexpectedErrorHandler)
process.on("unhandledRejection", unexpectedErrorHandler)
