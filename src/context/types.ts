import { LoginParams, UserDataType } from '../services/auth'

export type ErrCallbackType = (err: { [key: string]: string }) => void

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
}
