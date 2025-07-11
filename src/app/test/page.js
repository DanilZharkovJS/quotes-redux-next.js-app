import React from 'react'
import { ProgressSpinner } from 'primereact/progressspinner'

function Search() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-900 px-6 py-10 text-white">
      <div className="flex justify-center items-center m-15">
        <ProgressSpinner
          style={{ width: '150px', height: '150px' }}
          strokeWidth="2"
          animationDuration="1.5s"
        />
      </div>
      <div className='flex justify-center text-center'>
        <h2 className='text-xl sm:text-4xl font-black'>Nothing in here. Go to another page.</h2>
      </div>
    </div>
  )
}

export default Search
