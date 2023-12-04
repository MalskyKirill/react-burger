import { configureStore } from '@reduxjs/toolkit';
import {rootReducer} from './reducers/index'

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
})
