import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// thunk для поиска цитат с параметрами author и text
export const fetchQuotesByAuthorAndText = createAsyncThunk(
  'search/fetchByAuthorAndText',
  async ({ author, text }) => {
    const params = new URLSearchParams()
    if (author) params.append('author', author)
    if (text) params.append('text', text)
    const url = `http://localhost:3000/quotes?${params.toString()}`

    const res = await fetch(url)
    if (!res.ok) throw new Error('Ошибка загрузки')
    return res.json()
  }
)

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    quotes: [],
    status: 'idle',
    error: null,
    searchAuthor: '',
    searchText: '',
  },
  reducers: {
    setSearchAuthor(state, action) {
      state.searchAuthor = action.payload
    },
    setSearchText(state, action) {
      state.searchText = action.payload
    },
    clearInputs(state) {
      state.searchAuthor = ''
      state.searchText = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuotesByAuthorAndText.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchQuotesByAuthorAndText.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.quotes = Array.isArray(action.payload)
          ? action.payload
          : [action.payload]
      })
      .addCase(fetchQuotesByAuthorAndText.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { setSearchAuthor, setSearchText, clearInputs } =
  searchSlice.actions
export default searchSlice.reducer

export const selectQuotes = (state) => state.search.quotes
export const selectStatus = (state) => state.search.status
export const selectError = (state) => state.search.error
export const selectSearchAuthor = (state) => state.search.searchAuthor
export const selectSearchText = (state) => state.search.searchText
