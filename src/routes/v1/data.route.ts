import { Router } from "express"

import {
  getAllData,
  getFilteredData,
  getRegexFilteredData,
} from "../../controllers/data.controller"

const router = Router()

/* Generic Endpoints */
router.get("/filter", getFilteredData)
router.get("/regex", getRegexFilteredData)
router.get("/", getAllData)

export default router
