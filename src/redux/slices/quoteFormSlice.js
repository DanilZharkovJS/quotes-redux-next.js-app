import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  author: '',
  text: '',
  categories: [],
}

const quoteFormSlice = createSlice({
  name: 'quoteForm',
  initialState,
  reducers: {
    setAuthor: (state, action) => {
      state.author = action.payload
    },
    setText: (state, action) => {
      state.text = action.payload
    },
    setCategories: (state, action) => {
      state.categories = action.payload
    },
    clearQuoteForm: (state) => {
      state.author = ''
      state.text = ''
      state.categories = []
    },
  },
})

export const {
  setAuthor,
  setText,
  setCategories,
  clearQuoteForm,
} = quoteFormSlice.actions

export const selectAuthor = (state) => state.quoteForm.author
export const selectText = (state) => state.quoteForm.text
export const selectCategories = (state) => state.quoteForm.categories

export default quoteFormSlice.reducer
