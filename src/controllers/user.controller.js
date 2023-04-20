import catchAsync from "../utils/catchAsyncErrors.js"
import pick from "../utils/pick.js"

import {
  createUser as createNewUser,
  queryUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from "../services/user.service.js"

export const createUser = catchAsync(async (req, res) => {
  const user = await createNewUser(req.body)

  res.status(200).send(user)
})

export const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name", "role"])

  const options = pick(req.query, ["sortBy", "limit", "page"])
  const result = await queryUsers(filter, options)

  res.status(200).send(result)
})

export const getUser = catchAsync(async (req, res) => {
  const user = await getUserById(req.params.userId)

  if (!user) {
    throw new Error({ status: 404, message: "User not found" })
  }

  res.send(user)
})

export const updateUser = catchAsync(async (req, res) => {
  const user = await updateUserById(req.params.userId, req.body)

  res.status(200).send(user)
})

export const deleteUser = catchAsync(async (req, res) => {
  await deleteUserById(req.params.userId)

  res.status(200).send()
})
