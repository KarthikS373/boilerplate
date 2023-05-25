import { Server } from "http"

export const exitHandler = (server: Server) => {
  if (server) {
    server.close(() => {
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
}

const unexpectedErrorHandler = (server: Server, error: unknown) => {
  console.log("An error occured:", error)
  exitHandler(server)
}

export default unexpectedErrorHandler
