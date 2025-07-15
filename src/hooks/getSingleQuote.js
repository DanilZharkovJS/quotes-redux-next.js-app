export default async function getSingleQuote(id) {
  const res = await fetch(`http://localhost:3000/quotes/${id}`)
  if (!res.ok) throw new Error('Quote not found')
  return res.json()
}