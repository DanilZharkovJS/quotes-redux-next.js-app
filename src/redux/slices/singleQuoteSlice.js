import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  quote: null,
  status: 'idle',
  error: null,
}

export const fetchQuoteById = createAsyncThunk(
  'singleQuote/fetchById',
  async (id) => {
    const res = await fetch(`http://localhost:3000/quotes/${id}`)
    if (!res.ok) {
      throw new Error('Quote not found')
    }
    const data = await res.json()
    return data
  }
)

const singleQuoteSlice = createSlice({
  name: 'singleQuote',
  initialState,
  reducers: {
    clearSingleQuote: (state) => {
      state.quote = null
      state.status = 'idle'
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuoteById.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchQuoteById.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.quote = action.payload
      })
      .addCase(fetchQuoteById.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { clearSingleQuote } = singleQuoteSlice.actions
export const selectSingleQuote = (state) => state.singleQuote.quote
export const selectSingleQuoteStatus = (state) => state.singleQuote.status
export const selectSingleQuoteError = (state) => state.singleQuote.error
export default singleQuoteSlice.reducer
