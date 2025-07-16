import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  authorError: null,
  textError: null,
  limitError: null,
  categoriesError: null,
}

const validationSlice = createSlice({
  name: 'validation',
  initialState,
  reducers: {
    setAuthorError: (state, action) => {
      state.authorError = action.payload
    },
    setTextError: (state, action) => {
      state.textError = action.payload
    },
    setLimitError: (state, action) => {
      state.limitError = action.payload
    },
    setCategoriesError: (state, action) => {
      state.limitError = action.payload
    },
  },
})

export const { setAuthorError, setTextError, setLimitError, setCategoriesError } =
  validationSlice.actions

export const selectTextError = (state) => state.validation.textError
export const selectAuthorError = (state) => state.validation.authorError
export const selectLimitError = (state) => state.validation.limitError
export const selectCategoriesError = (state) => state.validation.limitError

export default validationSlice.reducer