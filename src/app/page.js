'use client'
import { fetchQuotes, selectQuotes } from '@/redux/slices/quotesSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function Home() {
  const dispatch = useDispatch()
  const quotes = useSelector(selectQuotes)

  const handleQuotes = () => {
    dispatch(fetchQuotes())
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-10 rounded-lg" >
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">
        Next.js Quotes App
      </h1>

      <button
        onClick={handleQuotes}
        className="mb-8 px-6 py-3 bg-black text-white rounded-lg shadow-md hover:bg-gray-800 transition cursor-pointer"
      >
        Get 10 Random Quotes
      </button>

      <div className="w-full max-w-2xl space-y-6">
        {quotes.length ? (
          quotes.map((quote) => (
            <div
              key={quote.id}
              className="bg-white border border-gray-200 rounded-xl p-6 transition shadow-sm hover:translate-px"
            >
              <p className="text-lg text-gray-800 italic">“{quote.text}”</p>
              <p className="mt-4 text-right text-gray-600 font-medium">
                — {quote.author}
              </p>
            </div>
          ))
        ) : (
          <h2 className="text-xl text-gray-500 text-center">
            Quotes gonna be here.
          </h2>
        )}
      </div>
    </div>
  )
}
