import { configureStore } from '@reduxjs/toolkit'
import { quotesReducer } from './slices/quotesSlice'
import singleQuoteReducer from './slices/singleQuoteSlice'
import searchReducer from './slices/searchSlice'
import validationReducer from './slices/validationSlice'

export const store = configureStore({
  reducer: {
    quotes: quotesReducer,
    singleQuote: singleQuoteReducer,
    search: searchReducer,
    validation: validationReducer,
  },
})
