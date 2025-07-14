'use client'

import React from 'react'
import Link from 'next/link'

function CardOne({ quote, details }) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-sm hover:scale-[1.005] transition">
      <p className="text-lg text-gray-200 italic">“{quote.text}”</p>
      <p className="mt-4 text-right text-gray-400 font-medium">
        — {quote.author}
      </p>

      {details && (
        <div className="mt-6 text-center">
          <Link
            href={`/quotes/${quote.id}`}
            className="inline-block px-5 py-2 bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-semibold rounded-full transition"
          >
            More details
          </Link>
        </div>
      )}
    </div>
  )
}

export default CardOne
