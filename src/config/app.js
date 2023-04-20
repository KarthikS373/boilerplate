import cors from "cors"
import express from "express"
import helmet from "helmet"

import routes from "../routes/index.js"
import logger from "./logger.js"

const app = express()
const port = 3000

/* Parsers and security HTTP headers */
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* Cors */
app.use(cors())
app.options("*", cors())

/* Logger */
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`)

  next()
})

/* API routes */
app.use(`/api/v1`, routes)

// /* Error Handling */
// app.use(errorConverter)
// app.use(errorHandler)

export default app
