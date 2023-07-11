import axios, { AxiosInstance } from 'axios'
import { getStorage } from '../../utils'

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use((config) => {
  if (config.headers) {
    const accessToken = getStorage('access_token')
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
  }

  return config
})
