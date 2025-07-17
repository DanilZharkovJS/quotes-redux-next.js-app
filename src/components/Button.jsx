import React from 'react'

export default function Button({
  children,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  text,
}) {
  return (
    <div className="flex">
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`
          px-3 py-1 rounded-md font-black
          bg-gray-600
          disabled:bg-gray-400 disabled:cursor-not-allowed
          transition-colors duration-200 cursor-pointer
          ${className}
        `}
      >
        {text || children}
      </button>
    </div>
  )
}
