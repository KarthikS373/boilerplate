export const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed")
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
}

const unexpectedErrorHandler = (error) => {
  logger.error(error)
  exitHandler()
}

export default unexpectedErrorHandler
