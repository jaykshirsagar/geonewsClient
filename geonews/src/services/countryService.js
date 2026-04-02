import axios from 'axios'

const API_BASE = 'http://localhost:8080/api'

export const getCountryInfo = async (countryCode) => {
  const response = await axios.get(`${API_BASE}/country/${countryCode}`)
  return response.data
}

export const getAiHistory = async (countryCode) => {
  const response = await axios.get(`${API_BASE}/country/history/${countryCode}`)
  return response.data
}

export const getNewsByCategory = async (countryCode,category) => {
  const response = await axios.get(`${API_BASE}/country/${countryCode}/${category}`)
  return response.data
}