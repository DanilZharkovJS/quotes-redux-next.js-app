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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 px-4 py-10 rounded-lg text-white">
      <h1 className="text-4xl font-extrabold mb-8 text-white">
        Next.js Quotes App
      </h1>

      <button
        onClick={handleQuotes}
        className="mb-8 px-6 py-3 bg-white text-black rounded-lg shadow-md hover:bg-gray-200 transition cursor-pointer"
      >
        Get 10 Random Quotes
      </button>

      <div className="w-full max-w-2xl space-y-6">
        {quotes.length ? (
          quotes.map((quote) => (
            <div
              key={quote.id}
              className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-sm hover:scale-[1.01] transition"
            >
              <p className="text-lg text-gray-200 italic">“{quote.text}”</p>
              <p className="mt-4 text-right text-gray-400 font-medium">
                — {quote.author}
              </p>
            </div>
          ))
        ) : (
          <h2 className="text-xl text-gray-400 text-center">
            Quotes gonna be here.
          </h2>
        )}
      </div>
    </div>
  )
}
