import React from 'react'

const Topper = ({className , text }) => {
  return (
    <div className={` ${className} w-full flex-center !justify-between border-b border-[var(--border)] py-3 `}>
      <span className='text-[var(--orange)]'>{text.left}</span>
      <span>{text.right}</span>
    </div>
  )
}

export default Topper