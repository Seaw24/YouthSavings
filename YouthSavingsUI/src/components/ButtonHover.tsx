import React from 'react'
import '../index.css';

interface ButtonHoverProps {
    children: React.ReactNode
    isActive: boolean
    onClick: () => void
    className?: string
    size?: string
  }
  
  export default function ButtonHover({ 
    children, 
    isActive,
    onClick,
    className,
    size = 'h-[clamp(3rem,4vw,10rem)] w-[clamp(4rem,11vw,100rem)]'
  }: ButtonHoverProps) {
    const combinedClasses = `button__hover ${size} ${className || ''} ${isActive ? 'button__active' : ''}`.trim()
  
    return (
      <button 
        onClick={onClick}
        className={combinedClasses}
      >
        <div className="w-full h-full flex items-center justify-center">
          {children}
        </div>
      </button>
    )
  }