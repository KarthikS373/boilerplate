import Data from "../model/data.model"

/* Fetch all data from Data */
export const fetchAllData = async () => {
  try {
    const data = await Data.find({})
    return data
  } catch (error) {
    throw new Error(error)
  }
}

/* Filtering Queries */
export interface FetchFilteredDataFilter {
  phone_price?: {
    min?: number
    max?: number
  }
  income?: {
    min?: number
    max?: number
  }
  city?: string
  car?: string
  first_name?: string
  last_name?: string
  email?: string
  gender?: string
  quote?: string
}

export const fetchFilteredData = async (filters?: FetchFilteredDataFilter) => {
  console.log("Filters: ", filters)
  try {
    const query: any = {}

    if (filters?.phone_price) {
      const { min, max } = filters.phone_price
      if (min) query.phone_price = { $gte: min }
      if (max) query.phone_price = { ...query.phone_price, $lte: max }
    }

    if (filters?.income) {
      const { min, max } = filters.income
      if (min) query.income = { $gte: min }
      if (max) query.income = { ...query.income, $lte: max }
    }

    if (filters?.city) {
      query.city = filters.city
    }

    if (filters?.car) {
      query.car = typeof filters.car === "string" ? filters.car : { $in: [...filters.car] }
    }

    if (filters?.first_name) {
      query.first_name = { $regex: new RegExp(filters.first_name), $options: "i" }
    }

    if (filters?.last_name) {
      query.last_name = { $regex: new RegExp(filters.last_name), $options: "i" }
    }

    if (filters?.email) {
      query.email = { $regex: new RegExp(filters.email), $options: "i" }
    }

    if (filters?.gender) {
      query.gender = filters.gender
    }

    if (filters?.quote) {
      query.quote = { $regex: new RegExp(filters.quote) }
    }

    console.log("Constructed query: ", query)

    const data = await Data.find(query)

    return data
  } catch (error) {
    throw new Error(error)
  }
}

/* Regex Queries */
export interface FetchRegexFilteredData<T = string> {
  city?: T
  car?: T
  email?: T
  quote?: T
}

export const fetchRegexFilteredData = async (filters?: FetchRegexFilteredData) => {
  try {
    const { city, email, quote, car } = filters || {}

    const regexFilters: FetchRegexFilteredData<RegExp> = {}

    if (city) regexFilters.city = new RegExp(city)
    if (car) regexFilters.car = new RegExp(car)
    if (email) regexFilters.email = new RegExp(email)
    if (quote) regexFilters.quote = new RegExp(quote)

    const data = await Data.find(regexFilters)

    return data
  } catch (error) {
    throw new Error(error)
  }
}
