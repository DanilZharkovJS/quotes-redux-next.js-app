import { configureStore } from '@reduxjs/toolkit'
import { quotesReducer } from './slices/quotesSlice'
import searchReducer from './slices/searchSlice'
import validationReducer from './slices/validationSlice'

export const store = configureStore({
  reducer: {
    quotes: quotesReducer,
    search: searchReducer,
    validation: validationReducer,
  },
})
