import { configureStore } from '@reduxjs/toolkit'
import { UserApiSlice } from './features/UserData'
import { ConferenceApiSlice } from './features/ConferenceData'

export const makeStore = () => {
  return configureStore({
    reducer: {
      // Add the generated reducer as a specific top-level slice
    [UserApiSlice.reducerPath]: UserApiSlice.reducer,
    [ConferenceApiSlice.reducerPath]: ConferenceApiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(UserApiSlice.middleware,ConferenceApiSlice.middleware),
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']