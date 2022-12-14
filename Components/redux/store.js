import { configureStore } from '@reduxjs/toolkit'
import musicReducer from './musicSlice';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    music : musicReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      ImmutableStateInvariantMiddleware: false
    }),
})