'use client'
import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'



function Search() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-900 px-6 py-10 text-white">
      <div className="flex justify-center flex-col sm:flex-row items-center m-15 gap-7">
        <h2 className='text-xl sm:text-2xl font-black'>Nothing in here. Go to another page.</h2>
        <CircularProgress color="inherit" size={30} />
      </div>
    </div>
  )
}

export default Search
   