import React from 'react'

const RoleInfoHeader = ({
    role ,
    experience,
    topicsToFocus,
    questions, 
    description, 
    lastUpdated 
}) => {
  return (
<div className="relative w-full max-w-full mx-auto h-[250px] p-6  bg-white shadow-lg overflow-hidden">
  {/* Animated Gradient Blob */}
  <div className="absolute right-0 top-0 w-1/3 h-full animate-gradient-x  opacity-50 blur-2xl pointer-events-none" />

  {/* Content */}
  <div className="relative z-10 ml-20 flex flex-col justify-center h-full">
    {/* Header */}
    <div className="mb-4">
      <h2 className="text-3xl font-semibold text-gray-900">{role}</h2>
      <p className="text-lg text-gray-600 mt-1">{topicsToFocus}</p>
    </div>

    {/* Metadata */}
    <div className="flex flex-wrap gap-3 mb-4">
      <span className="px-4 py-1 text-sm font-medium text-white bg-black rounded-full">
        Experience: {experience} {experience == 1 ? "Year" : "Years"}
      </span>
      <span className="px-4 py-1 text-sm font-medium text-white bg-black rounded-full">
        {questions} Q&A
      </span>
      <span className="px-4 py-1 text-sm font-medium text-white bg-black rounded-full">
        Last Updated: {lastUpdated}
      </span>
    </div>

    {/* Description (optional) */}
    {/* <p className="text-sm text-gray-500">{description}</p> */}
  </div>
</div>

    )
    }

    export default RoleInfoHeader
