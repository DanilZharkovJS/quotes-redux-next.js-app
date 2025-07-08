'use client'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = []

export const fetchQuotes = createAsyncThunk('quotes/fetchQuotes', async () => {
  const response = await fetch('http://localhost:3000/quotes/random')
  const data = await response.json()
  return data
})

const quotesSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {
    setAddQuotes: (action) => {
      return action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuotes.fulfilled, (state, action) => {
      return action.payload
    })
  },
})

export const { setAddQuotes } = quotesSlice.actions
export const selectQuotes = (state) => state.quotes
export const quotesReducer = quotesSlice.reducer
