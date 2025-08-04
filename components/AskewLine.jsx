import React from 'react'
import clsx from 'clsx'

const AskewLine = ({
  svgPath = 'M 0 10 Q 50 0 100 10',
  width = 100,
  height = 20,
  color = 'white',
  direction = 'horizontal',
  className = '',
}) => {
  const rotationClass = direction === 'vertical' ? 'rotate-90 origin-center' : ''
  
  return (
    <svg
      className={clsx('transition-transform', rotationClass, className)}
      width={width}
      height={height}
      viewBox="0 0 100 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={svgPath}
        stroke={color}
        strokeOpacity="0.5"
        strokeWidth="2"
        fill="transparent"
      />
    </svg>
  )
}

export default AskewLine
