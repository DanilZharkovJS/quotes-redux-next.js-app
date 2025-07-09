'use client'

import { useDispatch, useSelector } from 'react-redux'
import {
  selectQuotes,
  selectStatus,
  selectError,
  selectSearchAuthor,
  selectSearchText,
  setSearchAuthor,
  setSearchText,
  fetchQuotesByAuthorAndText,
  clearInputs,
} from '@/redux/slices/searchSlice'
import CardOne from '@/components/CardOne'

export default function Search() {
  const dispatch = useDispatch()
  const quotes = useSelector(selectQuotes)
  const status = useSelector(selectStatus)
  const error = useSelector(selectError)
  const searchAuthor = useSelector(selectSearchAuthor)
  const searchText = useSelector(selectSearchText)

  const handleSearch = () => {
    dispatch(
      fetchQuotesByAuthorAndText({ author: searchAuthor, text: searchText })
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-900 px-6 py-10 text-white">
      <h1 className="text-4xl font-extrabold mb-8">Search Quotes</h1>

      <div className="flex flex-col gap-4 mb-8 w-full max-w-3xl">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Author"
            value={searchAuthor}
            onChange={(e) => dispatch(setSearchAuthor(e.target.value))}
            className="flex-grow p-3 rounded border border-yellow-400 bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="text"
            placeholder="Text"
            value={searchText}
            onChange={(e) => dispatch(setSearchText(e.target.value))}
            className="flex-grow p-3 rounded border border-yellow-400 bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            onClick={handleSearch}
            className="bg-yellow-400 text-black px-6 py-3 rounded font-semibold hover:bg-yellow-500 transition cursor-pointer"
          >
            Search
          </button>
        </div>

        <button
          onClick={() => dispatch(clearInputs())}
          className="self-center mt-2 text-white bg-gray-700 hover:bg-gray-600 px-5 py-2 rounded transition cursor-pointer"
        >
          Clear search fields
        </button>
      </div>

      {status === 'loading' && (
        <p className="text-yellow-400 text-lg mb-6">Loading...</p>
      )}
      {status === 'failed' && (
        <p className="text-red-500 text-lg mb-6">Error: {error}</p>
      )}
      {quotes.length === 0 && status === 'succeeded' && (
        <p className="text-gray-400 text-lg">No quotes found.</p>
      )}

      <ul className="w-full max-w-2xl space-y-6">
        {quotes.map((quote) => (
          <li key={quote.id}>
            <CardOne quote={quote} />
          </li>
        ))}
      </ul>
    </div>
  )
}
