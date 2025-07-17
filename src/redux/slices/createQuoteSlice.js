import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const createQuote = createAsyncThunk(
  'quote/createQuote',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/quotes/', data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

const myQuoteSlice = createSlice({
  name: 'quote',
  initialState: {
    quote: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createQuote.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(createQuote.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.quote = action.payload
      })
      .addCase(createQuote.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export const selectCreateStatus = (state) => state.createQuote?.status || 'idle'
export const selectCreatedQuote = (state) => state.createQuote?.quote || null
export const selectCreateError = (state) => state.createQuote?.error || null

export default myQuoteSlice.reducer
