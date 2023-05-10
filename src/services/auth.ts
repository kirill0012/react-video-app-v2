import endpoints from '../constants/endpoints'
import request from '../lib/api/request'
import axios from 'axios'
import Cookies from 'js-cookie'

export type UserDataType = {
  name: string
  access_token: string
  refresh_token: string
  avatar?: string | null
}

export type LoginParams = {
  email: string
  password: string
}

export type Profile = {
  project: {
    title: string
    avatar: string | null
  } | null
  generation_limits: {
    concepts: number
    iterations: number
  }
}

export const AuthAPI = {
  isAuthCookies: () => {
    const access_token = Cookies.get('access_token')
    const refresh_token = Cookies.get('refresh_token')

    return !!access_token && !!refresh_token
  },
  login: async (params: LoginParams): Promise<UserDataType> => {
    const response = await request
      .request({
        url: endpoints.loginEndpoint,
        method: 'POST',
        data: params,
      })
      .catch((error) => {
        return Promise.reject(error)
      })

    Cookies.set('access_token', response.data.access_token, {
      expires: 7, // 1 week
      sameSite: 'strict',
      path: '/',
    })

    Cookies.set('refresh_token', response.data.refresh_token, {
      expires: 7, // 1 week
      sameSite: 'strict',
      path: '/',
    })

    return response.data
  },
  profile: async (): Promise<Profile> => {
    return await request
      .request({
        url: endpoints.profileEndpoint,
        method: 'GET',
        withCredentials: true,
      })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  me: async (): Promise<UserDataType> => {
    const response = await request
      .request({
        url: endpoints.meEndpoint,
        method: 'GET',
      })
      .catch((error) => {
        return Promise.reject(error)
      })

    return response.data
  },
  logout: async () => {
    const response = await request
      .request({
        url: endpoints.logoutEndpoint,
        method: 'POST',
      })
      .catch((error) => {
        return Promise.reject(error)
      })

    Cookies.remove('access_token')
    Cookies.remove('refresh_token')

    return response.data
  },
}
