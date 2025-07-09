import React from 'react'

function CardOne({ quote }) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-sm hover:scale-[1.005] transition">
      <p className="text-lg text-gray-200 italic">“{quote.text}”</p>
      <p className="mt-4 text-right text-gray-400 font-medium">
        — {quote.author}
      </p>
    </div>
  )
}

export default CardOne
