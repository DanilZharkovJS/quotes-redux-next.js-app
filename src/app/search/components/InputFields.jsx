'use client'

import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { RiDeleteBin2Line } from 'react-icons/ri'
import {
  selectSearchAuthor,
  selectSearchText,
  selectSearchLimit,
  setSearchAuthor,
  setSearchText,
  setSearchLimit,
  fetchQuotesByAuthorAndText,
  clearSearch,
} from '@/redux/slices/searchSlice'
import {
  selectAuthorError,
  selectLimitError,
  selectTextError,
  setTextError,
  setAuthorError,
  setLimitError,
} from '@/redux/slices/validationSlice'

export default function InputFields() {
  const dispatch = useDispatch()
  const searchAuthor = useSelector(selectSearchAuthor)
  const searchText = useSelector(selectSearchText)
  const searchLimit = useSelector(selectSearchLimit)
  const authorError = useSelector(selectAuthorError)
  const textError = useSelector(selectTextError)
  const limitError = useSelector(selectLimitError)

  const [authorTouched, setAuthorTouched] = useState(false)
  const [limitTouched, setLimitTouched] = useState(false)
  const [textTouched, setTextTouched] = useState(false)

  const validateAuthor = (value) => {
    return value.trim().length >= 3 || value.trim().length === 0
      ? null
      : 'Author must be at least 3 characters'
  }

  const validateText = (value) => {
    return value.trim().length >= 3 || value.trim().length === 0
      ? null
      : 'Text must be at least 3 characters'
  }

  const validateLimit = (value) => {
    const num = Number(value)
    return num >= 1 && num <= 50 ? null : 'Min. 1 | Max. 50'
  }

  const handleSearch = () => {
    setLimitTouched(true)
    setAuthorTouched(true)
    setTextTouched(true)

    const notValidAuthor = validateAuthor(searchAuthor)
    const notValidText = validateText(searchText)
    const notValidLimit = validateLimit(searchLimit)

    dispatch(setAuthorError(notValidAuthor))
    dispatch(setTextError(notValidText))
    dispatch(setLimitError(notValidLimit))

    if (notValidAuthor || notValidText || notValidLimit) return

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
    setAuthorTouched(false)
    setLimitTouched(false)
    setTextTouched(false)
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
          className="flex items-center gap-1 text-gray-400 hover:text-red-500 active:text-red-500 transition cursor-pointer"
        >
          <RiDeleteBin2Line className="w-[24px] h-[24px]" />
          <span className="font-medium mt-1">Clear</span>
        </button>
      </div>
      <div className="flex flex-row flex-wrap md:flex-row gap-4 sm:justify-center">
        <div className="flex-grow flex flex-col w-full sm:w-3/4 md:w-1/5">
          <input
            type="text"
            placeholder="Author"
            value={searchAuthor}
            className="p-3 rounded border border-yellow-400 bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onChange={(e) => {
              const value = e.target.value
              dispatch(setSearchAuthor(value))
              dispatch(setAuthorError(validateAuthor(value)))
            }}
            onBlur={() => setAuthorTouched(true)}
          />
          {authorTouched && authorError && (
            <p className="text-red-500 font-bold text-sm m-2">{authorError}</p>
          )}
        </div>

        {/* Text */}
        <div className="flex-grow flex flex-col w-full sm:w-3/4 md:w-1/3 sm:text-center">
          <input
            type="text"
            placeholder="Text"
            value={searchText}
            className="p-3 rounded border border-yellow-400 bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onChange={(e) => {
              const value = e.target.value
              dispatch(setSearchText(value))
              dispatch(setTextError(validateText(value)))
            }}
            onBlur={() => setTextTouched(true)}
          />
          {textTouched && textError && (
            <p className="text-red-500 font-bold text-sm m-2">{textError}</p>
          )}
        </div>
        <div className="flex-grow flex flex-col w-full sm:w-1/10">
          <input
            type="number"
            placeholder="Limit of quotes"
            value={searchLimit}
            className="p-3 rounded text-center border border-yellow-400 bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onChange={(e) => {
              const value = e.target.value
              dispatch(setSearchLimit(value))
              dispatch(setLimitError(validateLimit(value)))
            }}
            onBlur={() => setLimitTouched(true)}
          />
          {limitTouched && limitError && (
            <p className="text-red-500 font-bold text-sm m-2">{limitError}</p>
          )}
          {!limitTouched && !limitError && (
            <p className="font-bold ml-1">Limit</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-yellow-400 w-full sm:w-1/6 md:w-auto text-black px-6 py-3 rounded font-semibold hover:bg-yellow-500 transition cursor-pointer self-center sm:mb-5.5"
        >
          Search
        </button>
      </div>
    </form>
  )
}
