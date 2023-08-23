import { configureStore } from '@reduxjs/toolkit'
import locateReducer from './features/locateSlice'
import storage from "redux-persist/lib/storage" 

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"

const persistConfig = {
    key: "root",
    storage,
  }

const persistedReducer = persistReducer(persistConfig, locateReducer)


const store = configureStore({
  reducer: {
    locate:persistedReducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
devTools: process.env.NODE_ENV !== "production",
})

export const persistor = persistStore(store)
export default store


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch