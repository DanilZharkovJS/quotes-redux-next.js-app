import { useEffect, useState } from 'react'

export default function useSingleQuote(id) {
  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return

    const fetchQuote = async () => {
      setLoading(true)
      try {
        const res = await fetch(`http://localhost:3000/quotes/${id}`)
        if (!res.ok) throw new Error('Quote not found')

        const data = await res.json()
        setQuote(data)
        console.log(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchQuote()
  }, [id])

  return { quote, loading, error }
}
