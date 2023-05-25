import dotenv from "dotenv"
import Joi from "joi"

dotenv.config({})

const environmentSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid("production", "development", "test").required(),
    PORT: Joi.number().positive().required(),
    BASE_URL: Joi.string().required().description("My base url"),
    BASE_VERSION: Joi.string().required().description("My base version"),
    API_SECRET: Joi.string().required().description("My api secret"),
    MONGODB_URL: Joi.string().required().description("Mongo DB url"),
  })
  .unknown()

const { value: env, error } = environmentSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

export default {
  env: env.NODE_ENV,
  base: {
    url: env.BASE_URL,
    version: env.BASE_VERSION,
  },
  port: env.PORT,
  mongoose: {
    url: env.MONGODB_URL,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // autoIndex: false,
      // poolSize: 10,
      // serverSelectionTimeoutMS: 5000,
      // socketTimeoutMS: 45000,
      // family: 4, // IPv4
    },
  },
}
