import { configureStore } from '@reduxjs/toolkit'
import { quotesReducer } from './slices/quotesSlice'
import searchReducer from './slices/searchSlice'
import validationReducer from './slices/validationSlice'
import createQuoteReducer from './slices/singleQuoteSlice'
import quoteFormReducer from './slices/quoteFormSlice'

export const store = configureStore({
  reducer: {
    quotes: quotesReducer,
    search: searchReducer,
    validation: validationReducer,
    createQuote: createQuoteReducer,
    quoteForm: quoteFormReducer,
  },
})
