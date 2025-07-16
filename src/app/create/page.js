'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { createQuote } from '@/redux/slices/createQuoteSlice'
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
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function CreatePage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const text = useSelector(selectText)
  const author = useSelector(selectAuthor)
  const categories = useSelector(selectCategories)
  const textError = useSelector(selectTextError)
  const authorError = useSelector(selectAuthorError)
  const categoriesError = useSelector(selectCategoriesError)

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

    const parsedCategories = categories
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean)

    const notValidText = validateText(text)
    const notValidAuthor = validateAuthor(author)
    const notValidCategories = validateCategories(parsedCategories)

    if (notValidText || notValidAuthor || notValidCategories) return

    dispatch(
      createQuote({ text: text, author: author, categories: parsedCategories })
    )
    const resultAction = await dispatch(
      createQuote({ text, author, categories: parsedCategories })
    )

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
    <div>
      <form onSubmit={handleCreate}>
        <Input
          type="text"
          placeholder="Text"
          value={text}
          onChange={(val) => {
            dispatch(setText(val))
            dispatch(setTextError(validateText(val)))
          }}
          onBlur={() => setTouched((prev) => ({ ...prev, textTouched: true }))}
          touched={touched.textTouched}
          error={textError}
        />
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
        <Input
          type="text"
          placeholder="Categories, use commas "
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

        <Button type="submit" text={'Create'} />
      </form>
    </div>
  )
}

export default CreatePage
