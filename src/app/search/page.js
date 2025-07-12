'use client'

import InputFields from './components/InputFields'
import QuotesList from './components/QuotesList'

export default function Search() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-900 px-6 py-10 text-white">
      <h1 className="text-4xl font-extrabold mb-8">Search Quotes</h1>
      <InputFields />
      <QuotesList />
    </div>
  )
}