import { Router } from "express"

import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../../controllers/user.controller.js"

const router = Router()

router.route("/").get(getUsers)

export default router
