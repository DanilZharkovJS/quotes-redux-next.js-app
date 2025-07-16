'use client'

import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FaSearch } from 'react-icons/fa'
import { RiDeleteBin2Line } from 'react-icons/ri'
import Input from '@/components/Input'

import {
  setSearchAuthor,
  setSearchText,
  setSearchLimit,
  clearSearch,
  fetchQuotesByAuthorAndText,
  selectSearchAuthor,
  selectSearchText,
  selectSearchLimit,
} from '@/redux/slices/searchSlice'

import {
  setAuthorError,
  setTextError,
  setLimitError,
  selectAuthorError,
  selectTextError,
  selectLimitError,
} from '@/redux/slices/validationSlice'

export default function InputFields() {
  const dispatch = useDispatch()
  const router = useRouter()
  const searchParams = useSearchParams()

  const searchAuthor = useSelector(selectSearchAuthor)
  const searchText = useSelector(selectSearchText)
  const searchLimit = useSelector(selectSearchLimit)

  const authorError = useSelector(selectAuthorError)
  const textError = useSelector(selectTextError)
  const limitError = useSelector(selectLimitError)

  const [touched, setTouched] = useState({
    authorTouched: false,
    textTouched: false,
    limitTouched: false,
  })

  useEffect(() => {
    const cleanParams = new URLSearchParams()

    const author = searchParams.get('author') || ''
    const text = searchParams.get('text') || ''
    const rawLimit = searchParams.get('limit') || '10'

    if (author) cleanParams.set('author', author)
    if (text) cleanParams.set('text', text)
    if (rawLimit) cleanParams.set('limit', rawLimit)

    if (window.location.search !== `?${cleanParams.toString()}`) {
      router.replace(`/search?${cleanParams.toString()}`)
    }

    dispatch(setSearchAuthor(author))
    dispatch(setSearchText(text))
    dispatch(
      setSearchLimit(String(Math.min(Math.max(Number(rawLimit), 1), 50)))
    )
  }, [searchParams])

  const validateAuthor = (value) =>
    value.trim().length >= 3 || value.trim().length === 0
      ? null
      : 'Author must be at least 3 characters'

  const validateText = (value) =>
    value.trim().length >= 3 || value.trim().length === 0
      ? null
      : 'Text must be at least 3 characters'

  const validateLimit = (value) => {
    const num = Number(value)
    return num >= 1 && num <= 50 ? null : 'Min. 1 | Max. 50'
  }

  const handleSearch = () => {
    setTouched({
      authorTouched: true,
      textTouched: true,
      limitTouched: true,
    })

    const authorErr = validateAuthor(searchAuthor)
    const textErr = validateText(searchText)
    const limitErr = validateLimit(searchLimit)

    dispatch(setAuthorError(authorErr))
    dispatch(setTextError(textErr))
    dispatch(setLimitError(limitErr))

    if (authorErr || textErr || limitErr) return

    const params = new URLSearchParams()
    if (searchAuthor) params.set('author', searchAuthor)
    if (searchText) params.set('text', searchText)
    if (searchLimit) params.set('limit', searchLimit)

    router.push(`/search/?${params.toString()}`)

    dispatch(
      fetchQuotesByAuthorAndText({
        author: searchAuthor,
        text: searchText,
        limit: searchLimit,
      })
    )
  }

  const handleClear = () => {
    dispatch(clearSearch())
    setTouched({
      authorTouched: false,
      textTouched: false,
      limitTouched: false,
    })
    router.push(`/search`)
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSearch()
      }}
      className="w-full flex flex-col"
    >
      <div className="w-full md:w-[30%] mb-2">
        <button
          type="button"
          onClick={handleClear}
          className="flex items-center gap-1 text-gray-400 hover:text-red-500 transition"
        >
          <RiDeleteBin2Line className="w-[24px] h-[24px]" />
          <span className="font-medium mt-1">Clear</span>
        </button>
      </div>

      <div className="flex flex-row flex-wrap gap-4 sm:justify-center">
        <div className="w-full sm:w-1/3">
          <Input
            id="author"
            value={searchAuthor}
            onChange={(val) => {
              dispatch(setSearchAuthor(val))
              dispatch(setAuthorError(validateAuthor(val)))
            }}
            onBlur={() =>
              setTouched((prev) => ({ ...prev, authorTouched: true }))
            }
            touched={touched.authorTouched}
            error={authorError}
            placeholder="Author"
          />
        </div>

        <div className="w-full sm:w-1/3">
          <Input
            id="text"
            value={searchText}
            onChange={(val) => {
              dispatch(setSearchText(val))
              dispatch(setTextError(validateText(val)))
            }}
            onBlur={() =>
              setTouched((prev) => ({ ...prev, textTouched: true }))
            }
            touched={touched.textTouched}
            error={textError}
            placeholder="Text"
          />
        </div>

        <div className="w-full sm:w-1/6">
          <Input
            id="limit"
            type="number"
            value={searchLimit}
            onChange={(val) => {
              dispatch(setSearchLimit(val))
              dispatch(setLimitError(validateLimit(val)))
            }}
            onBlur={() =>
              setTouched((prev) => ({ ...prev, limitTouched: true }))
            }
            touched={touched.limitTouched}
            error={limitError}
            placeholder="Limit"
            center
            extraNote="Limit"
          />
        </div>

        <button
          type="submit"
          className="bg-yellow-400 text-black px-6 py-3 rounded font-semibold hover:bg-yellow-500 transition self-center w-full sm:w-1/6"
        >
          <div className="flex items-center gap-1 justify-center">
            <FaSearch />
            <p>Search</p>
          </div>
        </button>
      </div>
    </form>
  )
}
