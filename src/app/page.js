'use client'
import { fetchQuotes, selectQuotes } from '@/redux/slices/quotesSlice'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@/components/Button'
import CardOne from '@/components/CardOne'
import { useEffect } from 'react'
import { useInitialsQuotes } from '@/hooks/useInitialQuotes'
import Link from 'next/link'

export default function Home() {
  const dispatch = useDispatch()
  const quotes = useSelector(selectQuotes)

  useInitialsQuotes()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 px-4 py-10 rounded-lg text-white">
      <h1 className="text-4xl font-extrabold mb-8 text-white">
        Next.js Quotes App
      </h1>

      <Button
        onClick={() => dispatch(fetchQuotes())}
        text={'Get 10 Random Quotes'}
        className={
          'mb-8 px-6 py-3 bg-white text-black shadow-md hover:bg-gray-200 transition'
        }
      />

      <div className="w-full max-w-2xl space-y-6">
        {quotes.length ? (
          quotes.map((quote) => (
              <CardOne key={quote.id} quote={quote} details={true} />
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
