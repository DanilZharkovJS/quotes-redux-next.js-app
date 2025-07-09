import { configureStore } from '@reduxjs/toolkit'
import { quotesReducer } from './slices/quotesSlice'
import searchReducer from './slices/searchSlice'

export const store = configureStore({
  reducer: {
    quotes: quotesReducer,
    search: searchReducer,
  },
})
