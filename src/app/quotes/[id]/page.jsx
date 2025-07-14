'use client'

import { useParams } from 'next/navigation'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearSingleQuote,
  fetchQuoteById,
  selectSingleQuote,
  selectSingleQuoteError,
  selectSingleQuoteStatus,
} from '@/redux/slices/singleQuoteSlice'
import { useSingleQuote } from '@/hooks/useSingleQuote'

function SinglePage() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const quote = useSelector(selectSingleQuote)
  const status = useSelector(selectSingleQuoteStatus)
  const error = useSelector(selectSingleQuoteError)

  useSingleQuote()

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-yellow-400 text-xl font-semibold">
        Loading quote...
      </div>
    )
  }

  if (status === 'failed') {
    return (
      <div className="text-red-600 font-bold p-4 max-w-3xl mx-auto bg-gray-900 min-h-screen">
        Error: {error || 'Failed to load quote'}
      </div>
    )
  }

  if (!quote) {
    return (
      <div className="text-gray-500 font-medium p-4 max-w-3xl mx-auto bg-gray-900 min-h-screen">
        Quote not found.
      </div>
    )
  }

  return (
    <div className="bg-gray-900 min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto p-8 bg-gray-800 text-white rounded-xl shadow-xl">
        <h2 className="text-4xl font-black mb-6 text-white">
          {quote.author || 'Unknown Author'}
        </h2>
        <p className="text-xl italic mb-6 leading-relaxed">"{quote.text}"</p>
        {quote.description && (
          <p className="text-sm text-gray-300 mb-6">{quote.description}</p>
        )}
        {quote.categories?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {quote.categories.map((cat, idx) => (
              <span
                key={idx}
                className="bg-yellow-400 text-black text-sm font-semibold px-3 py-1 rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SinglePage
