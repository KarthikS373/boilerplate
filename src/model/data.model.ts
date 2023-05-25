import { Document, Schema, model } from "mongoose"
import validator from "validator"

import paginate from "../plugin/paginate.plugin"

const schema = new Schema(
  {
    id: {},
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
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
    gender: {
      type: String,
      required: true,
    },
    income: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    car: {
      type: String,
      required: true,
    },
    quote: { type: String, required: true },
    phone_price: { type: Number, required: true },
  },
  {
    collection: "dataset",
  }
)

schema.plugin(paginate)

const Data = model("Dataset", schema)

export default Data
