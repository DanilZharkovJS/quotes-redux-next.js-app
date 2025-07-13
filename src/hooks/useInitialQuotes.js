import { fetchQuotes } from "@/redux/slices/quotesSlice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

export const useInitialsQuotes = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchQuotes())
  }, [])
}