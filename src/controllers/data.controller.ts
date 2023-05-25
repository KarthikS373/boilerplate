import { Request, Response } from "express"

import {
  fetchAllData,
  fetchFilteredData,
  fetchRegexFilteredData,

  /* Interfaces */
  FetchFilteredDataFilter,
  FetchRegexFilteredData,
} from "../services/data.services"

/* Get all data */
/**
 * @title Get All Data
 * @dev Fetches all data from the database and sends it in the response.
 * @param req The request object.
 * @param res The response object.
 * @return Returns a JSON object with a message, data, and error properties.
 */

export const getAllData = async (req: Request, res: Response) => {
  try {
    const data = await fetchAllData()

    res.status(200).json({ message: "Data fetched successfully", data: data, error: null })
  } catch (error) {
    res.status(500).json({ message: "An error occured!", data: null, error: error.message })
  }
}

/* Filtered Endpoints */
/**
 * @title Get Filtered Data
 * @dev Fetches data from the database based on the specified filters and sends it in the response.
 * @param req The request object.
 * @param res The response object.
 * @return Returns a JSON object with a message, data, and error properties.
 */
export const getFilteredData = async (req: Request, res: Response) => {
  try {
    const phonePriceMin = Number(req.query.phonePriceMin)
    const phonePriceMax = Number(req.query.phonePriceMax)
    const incomeMin = Number(req.query.incomeMin)
    const incomeMax = Number(req.query.incomeMax)
    const city = req.query.city as string
    const car = req.query.car as string
    const firstName = req.query.firstName as string
    const lastName = req.query.lastName as string
    const email = req.query.email as string
    const gender = req.query.gender as string
    const quote = req.query.quote as string

    const filters: FetchFilteredDataFilter = {
      phone_price: {
        min: phonePriceMin,
        max: phonePriceMax,
      },
      income: {
        min: incomeMin,
        max: incomeMax,
      },
      city,
      car,
      first_name: firstName,
      last_name: lastName,
      email,
      gender,
      quote,
    }

    const data = await fetchFilteredData(filters)

    res.status(200).json({ message: "Data fetched successfully", data: data, error: null })
  } catch (error) {
    res.status(500).json({ message: "An error occured!", data: null, error: error.message })
  }
}

/* Regex based Endpoints */
/**
 * @title Get Regex Filtered Data
 * @dev Fetches data from the database based on the specified regex filters and sends it in the response.
 * @param req The request object.
 * @param res The response object.
 * @return Returns a JSON object with a message, data, and error properties.
 */
export const getRegexFilteredData = async (req: Request, res: Response) => {
  try {
    const { city, car, email, quote } = req.query

    const filters: FetchRegexFilteredData = {}

    if (city) filters.city = city.toString()
    if (car) filters.car = car.toString()
    if (email) filters.email = email.toString()
    if (quote) filters.quote = quote.toString()

    const data = await fetchRegexFilteredData(filters)

    res.status(200).json({ message: "Data fetched successfully", data: data, error: null })
  } catch (error) {
    res.status(500).json({ message: "An error occured!", data: null, error: error.message })
  }
}
