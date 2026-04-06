import React from 'react'

const Title = ({ title, subTitle, align = 'left' }) => {
  return (
    <div className={`w-full ${align === 'center' ? 'text-center' : 'text-left'}`}>
      <h1 className="text-2xl font-semibold text-gray-800">
        {title}
      </h1>

      {subTitle && (
        <p className="text-sm text-gray-500 mt-1">
          {subTitle}
        </p>
      )}
    </div>
  )
}

export default Title