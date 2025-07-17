import CircularProgress from '@mui/material/CircularProgress'
import React from 'react'

function Loading({text}) {
  return (
    <div className="flex items-center gap-3">
      <p className="text-yellow-400 text-lg">{text}</p>
      <CircularProgress color="inherit" size={20} />
    </div>
  )
}

export default Loading
