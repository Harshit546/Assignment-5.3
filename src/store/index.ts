import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './usersSlice'

// Creates the store
export const store = configureStore({
  reducer: { users: usersReducer },
})

// RootState knows the shape of the entire state tree
export type RootState = ReturnType<typeof store.getState>

// Used to dispatch actions in components with TS
export type AppDispatch = typeof store.dispatch
