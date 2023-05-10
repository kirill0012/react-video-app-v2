import axios from 'axios'
import Cookies from 'js-cookie'

export const API_URL = process.env.REACT_APP_API_URL_DEV
// const isServer = typeof window === 'undefined'

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

// const requestHandler = (request: AxiosRequestConfig) => {
//   const access_token = Cookies.get('access_token')
//   request.headers.Authorization = `Bearer ${access_token}`
//   return request
// }

$api.interceptors.request.use(
  async (config) => {
    const access_token = Cookies.get('access_token')
    const refresh_token = Cookies.get('refresh_token')
    if (access_token) {
      config.headers.set('Authorization', `Bearer ${access_token}`)
    }
    if (refresh_token) {
      config.headers.set('X-Refresh-Token', `Bearer ${refresh_token}`)
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

export default $api
