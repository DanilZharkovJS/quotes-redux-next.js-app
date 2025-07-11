'use client'

import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { Message } from 'primereact/message'
import {
  selectQuotes,
  selectSearchAuthor,
  selectSearchText,
  selectStatus,
  selectSearchError,
  setSearchAuthor,
  setSearchText,
  clearSearch,
  fetchQuotesByAuthorAndText,
} from '@/redux/slices/searchSlice'
import CardOne from '@/components/CardOne'
import { ErrorMessageStyle } from '../styles/ErrorMessageStyle'

export default function Search() {
  const dispatch = useDispatch()
  const quotes = useSelector(selectQuotes)
  const searchAuthor = useSelector(selectSearchAuthor)
  const searchText = useSelector(selectSearchText)
  const status = useSelector(selectStatus)
  const error = useSelector(selectSearchError)

  const [authorError, setAuthorError] = useState(null)
  const [textError, setTextError] = useState(null)
  const [authorTouched, setAuthorTouched] = useState(false)
  const [textTouched, setTextTouched] = useState(false)

  const validateAuthor = (value) => {
    return value.trim().length >= 3 || value.trim().length === 0
      ? null
      : 'Author must be at least 3 characters'
  }

  const validateText = (value) => {
    return value.trim().length >= 3 || value.trim().length === 0
      ? null
      : 'Text must be at least 3 characters'
  }

  const handleSearch = () => {
    setAuthorTouched(true)
    setTextTouched(true)
    const validAuthor = !validateAuthor(searchAuthor)
    const validText = !validateText(searchText)

    if (!validAuthor || !validText) return
    dispatch(
      fetchQuotesByAuthorAndText({ author: searchAuthor, text: searchText })
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-900 px-6 py-10 text-white">
      <h1 className="text-4xl font-extrabold mb-8">Search Quotes</h1>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-grow flex flex-col">
          <input
            type="text"
            placeholder="Author"
            value={searchAuthor}
            className="p-3 rounded border border-yellow-400 bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onChange={(e) => {
              const value = e.target.value
              dispatch(setSearchAuthor(value))
              setAuthorError(validateAuthor(value))
            }}
            onBlur={() => setAuthorTouched(true)}
          />
          {authorTouched && authorError && (
            <p className="text-red-500 font-bold text-sm m-2">{authorError}</p>
          )}
        </div>

        <div className="flex-grow flex flex-col">
          <input
            type="text"
            placeholder="Text"
            value={searchText}
            className="p-3 rounded border border-yellow-400 bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onChange={(e) => {
              const value = e.target.value
              dispatch(setSearchText(value))
              setTextError(validateText(value))
            }}
            onBlur={() => setTextTouched(true)}
          />
          {textTouched && textError && (
            <p className="text-red-500 font-bold text-sm m-2">{textError}</p>
          )}
        </div>

        <button
          className="bg-yellow-400 text-black px-6 py-3 rounded font-semibold hover:bg-yellow-500 transition cursor-pointer self-center sm:mb-5.5  "
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="flex justify-center">
        <button
          className="bg-gray-700 hover:bg-gray-600 text-white px-5 py-2 mt-3 sm:m-0 rounded transition cursor-pointer"
          onClick={() => dispatch(clearSearch())}
        >
          Clear Search Fields
        </button>
      </div>
      <div className="block">
        <div className="m-5 flex justify-center">
          {status === 'loading' && (
            <p className="text-yellow-400 text-lg mb-6">Loading...</p>
          )}
          {status === 'failed' && (
            <Message severity="error" text={error} style={ErrorMessageStyle}/>
          )}

          {status === 'succeeded' && quotes.length === 0 && (
            <p className="text-gray-400 text-lg">No quotes found.</p>
          )}
        </div>
        {quotes.length > 0 && (
          <ul className="w-full max-w-2xl space-y-6">
            {quotes.map((quote) => (
              <li key={quote.id}>
                <CardOne quote={quote} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
