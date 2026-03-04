import React from 'react'

interface IconProps {
  className?: string
}

const ChevronIcon: React.FC<IconProps> = ({className}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>

  )
}

export default ChevronIcon
