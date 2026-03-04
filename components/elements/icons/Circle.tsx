import React from 'react'

interface IconProps {
  width?: string
  className?: string
}

const Circle: React.FC<IconProps> = ({width, className}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={width} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className || "inline feather feather-circle"}><circle cx="12" cy="12" r="10">
            </circle>
        </svg>
    )
}

export default Circle
