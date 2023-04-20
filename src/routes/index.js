import { Router } from "express"

import env from "../config/env.js"

// Routes
import userRoute from "./v1/user.route.js"

const router = Router()

const defaultRoutes = [
  {
    path: "/user",
    route: userRoute,
  },
]

// routes available only in development mode
const devRoutes = [
  //   {
  //     path: "/docs",
  //     route: docsRoute,
  //   },
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

if (env.env === "development") {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route)
  })
}

export default router
