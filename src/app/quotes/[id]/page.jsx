'use client'
import { use } from 'react'
import {
  getSingleQuote,
  deleteQuote,
  selectSingleQuoteStatus,
  selectSingleQuote,
} from '@/redux/slices/singleQuoteSlice'
import Button from '@/components/Button'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { removeQuoteFromList } from '@/redux/slices/searchSlice'

function SinglePage({ params }) {
  const dispatch = useDispatch()
  const router = useRouter()
  const { id } = use(params)

  const status = useSelector(selectSingleQuoteStatus)
  const quote = useSelector(selectSingleQuote)

  useEffect(() => {
    dispatch(getSingleQuote(id))
  }, [dispatch, id])

  const handleDelete = () => {
    dispatch(deleteQuote(id))
    dispatch(removeQuoteFromList(id))
    const lastPage = sessionStorage.getItem('lastVisitedPage')
    router.push(lastPage)
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
              <Link
                key={idx}
                href={`https://www.google.com/search?q=${encodeURIComponent(
                  cat
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="bg-yellow-400 text-black text-sm font-semibold px-3 py-1 rounded-full cursor-pointer">
                  {cat}
                </span>
              </Link>
            ))}
          </div>
        )}
        <div className="mt-3"></div>
        <Button text={'Delete'} onClick={handleDelete} className="bg-red-500" />
      </div>
    </div>
  )
}

export default SinglePage
