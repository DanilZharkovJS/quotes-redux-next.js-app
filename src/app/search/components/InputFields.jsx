'use client'

import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { RiDeleteBin2Line } from 'react-icons/ri'
import { createInputsConfig } from '../data/inputsConfig'
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
import { FaSearch } from 'react-icons/fa'

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

  const inputsConfig = createInputsConfig({
    searchAuthor,
    searchText,
    searchLimit,
    authorError,
    textError,
    limitError,
    setAuthorTouched,
    setTextTouched,
    setLimitTouched,
    validateAuthor,
    validateText,
    validateLimit,
    dispatch,
    setSearchAuthor,
    setSearchText,
    setSearchLimit,
    setAuthorError,
    setTextError,
    setLimitError,
  })

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
        {inputsConfig.map((input) => (
          <div
            key={input.id}
            className={`flex-grow flex flex-col w-full sm:w-3/4 md:w-${
              input.id === 'limit'
                ? '1/10'
                : input.id === 'author'
                ? '1/5'
                : '1/3'
            } ${input.id === 'text' ? 'sm:text-center' : ''}`}
          >
            <input
              type={input.type || 'text'}
              placeholder={input.placeholder}
              value={input.value}
              className={`p-3 rounded ${
                input.center ? 'text-center' : ''
              } border border-yellow-400 bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400`}
              onChange={(e) => input.onChange(e.target.value)}
              onBlur={() => input.setTouched(true)}
            />
            {input.touched && input.error && (
              <p className="text-red-500 font-bold text-sm m-2">
                {input.error}
              </p>
            )}
            {!input.touched && !input.error && input.extraNote && (
              <p className="font-bold ml-1">{input.extraNote}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="bg-yellow-400 pl-4 pr-4 w-full sm:w-1/6 md:w-auto text-black px-6 py-3 rounded font-semibold hover:bg-yellow-500 transition cursor-pointer self-center sm:mb-5.5"
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
