export const createInputsConfig = ({
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
}) => [
  {
    id: 'author',
    placeholder: 'Author',
    value: searchAuthor,
    error: authorError,
    setTouched: setAuthorTouched,
    onChange: (value) => {
      dispatch(setSearchAuthor(value))
      dispatch(setAuthorError(validateAuthor(value)))
    },
  },
  {
    id: 'text',
    placeholder: 'Text',
    value: searchText,
    error: textError,
    setTouched: setTextTouched,
    onChange: (value) => {
      dispatch(setSearchText(value))
      dispatch(setTextError(validateText(value)))
    },
  },
  {
    id: 'limit',
    placeholder: 'Limit of quotes',
    value: searchLimit,
    error: limitError,
    setTouched: setLimitTouched,
    type: 'number',
    center: true,
    extraNote: 'Limit',
    onChange: (value) => {
      dispatch(setSearchLimit(value))
      dispatch(setLimitError(validateLimit(value)))
    },
  },
]
