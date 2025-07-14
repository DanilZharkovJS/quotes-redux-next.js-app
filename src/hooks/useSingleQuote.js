import { clearSingleQuote, fetchQuoteById } from "@/redux/slices/singleQuoteSlice"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

export const useSingleQuote = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  
    useEffect(() => {
      dispatch(fetchQuoteById(id))
      return () => {
        dispatch(clearSingleQuote())
      }
    }, [dispatch, id])
}