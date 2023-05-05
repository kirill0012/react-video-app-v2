import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Profile, UserDataType } from '../../services/auth'
import { RootState } from '../store'

type UserState = {
  user: UserDataType | null
  profile: Profile | null
}

const initialState: UserState = { user: null, profile: null }

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserDataType | null>) => {
      state.user = action.payload
    },
    setProfile: (state, action: PayloadAction<Profile | null>) => {
      state.profile = action.payload
    },
  },
})

export const { setUser, setProfile } = user.actions

export const getUser = (state: RootState) => state.user.user
export const getProject = (state: RootState) => state.user.profile?.project
export const getLimits = (state: RootState) => state.user.profile?.generation_limits

export default user.reducer
