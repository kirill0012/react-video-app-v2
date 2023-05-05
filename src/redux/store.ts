import { configureStore } from '@reduxjs/toolkit'

import user from './reducers/userReducer'
import gen from './reducers/genReducer'
// import counter from "../containers/Home/counterReducer"

const store = configureStore({
  reducer: {
    user,
    gen,
    // counter: counter,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
