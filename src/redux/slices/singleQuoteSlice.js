import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getSingleQuote = createAsyncThunk(
  'quote/getSingleQuote',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3000/quotes/${id}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)
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
export const deleteQuote = createAsyncThunk(
  'quote/deleteQuote',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:3000/quotes/${id}`)
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
      .addCase(getSingleQuote.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getSingleQuote.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.quote = action.payload
      })
      .addCase(getSingleQuote.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
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
      .addCase(deleteQuote.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(deleteQuote.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.quote = action.payload
      })
      .addCase(deleteQuote.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export const selectSingleQuoteStatus = (state) =>
  state.createQuote?.status || 'idle'
export const selectSingleQuote = (state) => state.createQuote?.quote || null
export const selectSingleQuoteError = (state) =>
  state.createQuote?.error || null

export default myQuoteSlice.reducer
