import cors from "cors"
import express from "express"
import helmet from "helmet"

import routes from "../routes"
import env from "./env"

const app = express()

/* Parsers and security HTTP headers */
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* Cors */
app.use(cors())
app.options("*", cors())

/* Custom Logger */
app.use((req, res, next) => {
  console.log(`${req.method}: ${req.url}`)
  next()
})

/* API routes */
app.use(`/api/${env.base.version || "v1"}`, routes)

// /* Error Handling */
// app.use(errorConverter)
// app.use(errorHandler)

export default app
