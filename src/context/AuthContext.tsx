// ** React Imports
import { createContext, useState, ReactNode } from 'react'

import { useNavigate } from 'react-router-dom'

// ** Types
import { AuthValuesType, ErrCallbackType } from './types'
import { AuthAPI, LoginParams, UserDataType } from '../services/auth'
import Cookies from 'js-cookie'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
  initialUserValue?: UserDataType
}

const AuthProvider = ({ children, initialUserValue }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(initialUserValue || null)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const navigate = useNavigate()

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    AuthAPI.login(params)
      .then((user) => {
        setUser(user)
        navigate('/')
      })
      .catch((error) => {
        if (errorCallback) errorCallback(error.error)
      })
  }

  const handleLogout = (errorCallback?: ErrCallbackType) => {
    AuthAPI.logout()
      .then(async () => {
        Cookies.remove('access_token')
        setUser(null)
        navigate('/login')
        return null
      })

      .catch((err) => {
        if (errorCallback) errorCallback(err)
      })
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
