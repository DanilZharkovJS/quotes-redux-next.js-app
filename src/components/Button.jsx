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
    <button
      type={type}
      onClick={onClick}
      className={className}
      disabled={disabled}
    >
      {text || children}
    </button>
  )
}
