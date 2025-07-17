'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@/components/Button'
import Input from '@/components/Input'
import {
  createQuote,
  selectCreateError,
  selectCreateStatus,
} from '@/redux/slices/createQuoteSlice'
import {
  clearQuoteForm,
  selectAuthor,
  selectCategories,
  selectText,
  setAuthor,
  setCategories,
  setText,
} from '@/redux/slices/quoteFormSlice'
import {
  selectAuthorError,
  selectCategoriesError,
  selectTextError,
  setAuthorError,
  setCategoriesError,
  setTextError,
} from '@/redux/slices/validationSlice'
import Loading from '@/components/Loading'
import AlertError from '@/components/AlertError'

function CreatePage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const text = useSelector(selectText)
  const author = useSelector(selectAuthor)
  const categories = useSelector(selectCategories)
  const textError = useSelector(selectTextError)
  const authorError = useSelector(selectAuthorError)
  const categoriesError = useSelector(selectCategoriesError)
  const status = useSelector(selectCreateStatus)
  const error = useSelector(selectCreateError)

  const [touched, setTouched] = useState({
    textTouched: false,
    authorTouched: false,
    categoriesTouched: false,
  })

  const validateAuthor = (value) => {
    return value.trim().length < 2 || value.trim().length > 255
      ? 'Author length must be 2-255'
      : null
  }
  const validateText = (value) => {
    return value.trim().length < 10 ? 'Text length must be more than 10' : null
  }
  const validateCategories = (array) => {
    if (array.length === 0) return 'At least one category required'

    const regex = /^[a-z-]+$/
    const allValid = array.every((cat) => regex.test(cat) && cat.length >= 3)

    return allValid ? null : 'Min. 3, only lowercase letters and dashes allowed'
  }

  const handleCreate = async (e) => {
    e.preventDefault()

    const parsedCategories = (typeof categories === 'string' ? categories : '')
      .split(',')
      .map((c) => c.trim())
      .filter((c) => c.length >= 3)
    
    const notValidText = validateText(text)
    const notValidAuthor = validateAuthor(author)
    const notValidCategories = validateCategories(parsedCategories)

    if (notValidText || notValidAuthor || notValidCategories) return

    const resultAction = await dispatch(
      createQuote({ text, author, categories: parsedCategories })
    )

    dispatch(clearQuoteForm())

    if (createQuote.fulfilled.match(resultAction)) {
      const newId = resultAction.payload.id
      router.push(`/quotes/${newId}`)
    }
  }

  const handleCategoriesChange = (val) => {
    dispatch(setCategories(val))

    const arr = val
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean)

    dispatch(setCategoriesError(validateCategories(arr)))
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-md font-sans">
      <form onSubmit={handleCreate} className="space-y-6">
        <div>
          <Input
            type="text"
            placeholder="Text"
            value={text}
            onChange={(val) => {
              dispatch(setText(val))
              dispatch(setTextError(validateText(val)))
            }}
            onBlur={() =>
              setTouched((prev) => ({ ...prev, textTouched: true }))
            }
            touched={touched.textTouched}
            error={textError}
          />
        </div>

        <div>
          <Input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(val) => {
              dispatch(setAuthor(val))
              dispatch(setAuthorError(validateAuthor(val)))
            }}
            onBlur={() =>
              setTouched((prev) => ({ ...prev, authorTouched: true }))
            }
            touched={touched.authorTouched}
            error={authorError}
          />
        </div>

        <div>
          <Input
            type="text"
            placeholder="Categories, use commas"
            value={categories}
            onChange={(val) => {
              handleCategoriesChange(val)
            }}
            onBlur={() =>
              setTouched((prev) => ({ ...prev, categoriesTouched: true }))
            }
            touched={touched.categoriesTouched}
            error={categoriesError}
          />
        </div>

        <Button
          type="submit"
          text={'Create'}
          className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold  rounded-md transition cursor-pointer"
        />
      </form>
      {status === 'loading' && <Loading />}
      {status === 'failed' && (
        <AlertError title={'Error'} message={error} className={'mt-5'} />
      )}
    </div>
  )
}

export default CreatePage
