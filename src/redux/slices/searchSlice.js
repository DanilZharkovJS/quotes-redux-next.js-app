const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit')

const initialState = {
  quotes: [],
  searchAuthor: '',
  searchText: '',
  searchLimit: 10,
  status: 'idle',
  error: {
    searchError: null,
  },
}

const fetchQuotesByAuthorAndText = createAsyncThunk(
  'quotes/fetchByAuthorAndText',
  async ({ author, text, limit }) => {
    const params = new URLSearchParams()
    if (author) params.append('author', author)
    if (text) params.append('text', text)
    if (limit) params.append('limit', limit)

    const res = await fetch(`http://localhost:3000/quotes?${params.toString()}`)
    if (!res.ok) {
      throw new Error('Failed to fetch quotes')
    }
    const data = await res.json()
    return data
  }
)

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchAuthor(state, action) {
      state.searchAuthor = action.payload
    },
    setSearchText(state, action) {
      state.searchText = action.payload
    },
    setSearchLimit(state, action) {
      state.searchLimit = action.payload
    },
    clearSearch(state) {
      state.searchAuthor = ''
      state.searchText = ''
      state.searchLimit = 10
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuotesByAuthorAndText.pending, (state) => {
        state.status = 'loading'
        state.error.searchError = null
      })
      .addCase(fetchQuotesByAuthorAndText.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.quotes = action.payload
      })
      .addCase(fetchQuotesByAuthorAndText.rejected, (state, action) => {
        state.status = 'failed'
        state.error.searchError = action.error.message
      })
  },
})

export const { setSearchAuthor, setSearchText, setSearchLimit, clearSearch } =
  searchSlice.actions

export { fetchQuotesByAuthorAndText }

export const selectQuotes = (state) => state.search.quotes
export const selectSearchAuthor = (state) => state.search.searchAuthor
export const selectSearchText = (state) => state.search.searchText
export const selectSearchLimit = (state) => state.search.searchLimit
export const selectStatus = (state) => state.search.status
export const selectSearchError = (state) => state.search.error.searchError

export default searchSlice.reducer
