import { Router } from "express"

import dataRouter from "./v1/data.route"

const router = Router()

router.use("/data", dataRouter)

export default router
