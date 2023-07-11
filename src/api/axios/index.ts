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
    const email = getStorage('email')
    if (email) {
      config.headers['email'] = email
    }
  }

  return config
})
