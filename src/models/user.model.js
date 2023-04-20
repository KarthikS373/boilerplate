import mongoose from "mongoose"
import validator from "validator"
import bcrypt from "bcryptjs"

import paginate from "../plugins/paginate.plugin.js"

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email")
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error("Password must contain at least one letter and one number")
        }
      },
      private: true,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.plugin(paginate)

userSchema.statics.isEmailTaken = async (email, excludeUserId) => {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } })

  return !!user
}

userSchema.methods.isPasswordMatch = async (password) => {
  const user = this
  return bcrypt.compare(password, user.password)
}

userSchema.pre("save", async (next) => {
  const user = this
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

const User = mongoose.model("User", userSchema)

export default User
