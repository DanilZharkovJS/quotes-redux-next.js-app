'use client'

import { useSelector } from 'react-redux'
import Link from 'next/link'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import CircularProgress from '@mui/material/CircularProgress'
import { ErrorMessageStyle } from '../../styles/ErrorMessageStyle'
import {
  selectQuotes,
  selectStatus,
  selectSearchError,
} from '@/redux/slices/searchSlice'
import CardOne from '@/components/CardOne'
import Loading from '@/components/Loading'
import AlertError from '@/components/AlertError'

export default function QuotesList() {
  const quotes = useSelector(selectQuotes)
  const status = useSelector(selectStatus)
  const error = useSelector(selectSearchError)

  return (
    <div className="block">
      <div className="m-5 flex justify-center">
        {status === 'loading' && <Loading text={'Loading'}/>}
        {status === 'failed' && <AlertError title={'Error'} message={error} />}
        {status === 'succeeded' && quotes.length === 0 && (
          <p className="text-gray-400 text-lg">No quotes found.</p>
        )}
      </div>

      {quotes.length > 0 && (
        <ul className="w-full max-w-2xl space-y-6">
          {quotes.map((quote) => (
            <li key={quote.id}>
              <CardOne quote={quote} details={true} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
