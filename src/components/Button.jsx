import React from 'react'

export default function Button({
  children,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
}) {
  return (
    <button type={type} onClick={onClick} className={className} disabled={disabled}>
      {children}
    </button>
  )
}
