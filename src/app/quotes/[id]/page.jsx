'use client'

import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSingleQuote } from '@/hooks/useSingleQuote'
import {
  selectSingleQuote,
  selectSingleQuoteError,
  selectSingleQuoteStatus,
} from '@/redux/slices/singleQuoteSlice'

function SinglePage() {
  const quote = useSelector(selectSingleQuote)
  const status = useSelector(selectSingleQuoteStatus)
  const error = useSelector(selectSingleQuoteError)



  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-64 text-yellow-500 text-xl font-semibold">
        Loading quote...
      </div>
    )
  }

  if (status === 'failed') {
    return (
      <div className="text-red-600 font-bold p-4 max-w-xl mx-auto">
        Error: {error || 'Failed to load quote'}
      </div>
    )
  }

  if (!quote) {
    return (
      <div className="text-gray-500 font-medium p-4 max-w-xl mx-auto">
        Quote not found.
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-800 text-white rounded shadow-lg">
      <h2 className="text-3xl font-bold mb-4">
        {quote.author || 'Unknown Author'}
      </h2>
      <p className="text-lg italic mb-6">"{quote.text}"</p>
      {quote.description && (
        <p className="text-sm text-gray-300 mb-4">{quote.description}</p>
      )}
      {quote.categories?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {quote.categories.map((cat, idx) => (
            <span
              key={idx}
              className="bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded-full"
            >
              {cat}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default SinglePage
