import { useEffect, useState } from "react"


export default function useSingleQuote(id) {
  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    fetch(`http://localhost:3000/quotes/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Quote not found')
        return res.json()
      })
      .then(setQuote)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [id])

  return { quote, loading, error }
}