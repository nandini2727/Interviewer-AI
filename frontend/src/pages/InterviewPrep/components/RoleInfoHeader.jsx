import React, { useContext } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { ThemeContext } from '../../../context/themeContext'

const RoleInfoHeader = ({
    role ,
    experience,
    topicsToFocus,
    questions, 
    lastUpdated 
}) => {
  const {theme}=useContext(ThemeContext)
  return (
    <div className="relative w-full max-w-full mx-auto md:h-[250px] p-6 bg-white dark:bg-gray-900 shadow-lg overflow-hidden transition-colors duration-300">
      {/* Animated Gradient Blob */}
      <div className="absolute right-0 top-0 w-1/3 h-full animate-gradient-x opacity-50 blur-2xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 md:ml-20 flex flex-col justify-center h-full">
        {/* Header */}
        <div className="mb-4">
          <SkeletonTheme baseColor={theme=='light'? "#e0e0e0": "#7a7a7a"} highlightColor={theme=='light'?"#f5f5f5":"#7a7a7a" }>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100">
            {role || <Skeleton width={"25%"} />}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">
            {topicsToFocus || <Skeleton width={"35%"} height={18} />}
          </p>
          </SkeletonTheme>
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap gap-3 mb-4">
          <span className="px-4 py-1 text-sm font-medium text-white bg-black dark:bg-gray-700 rounded-full">
            Experience: {experience} {experience == 1 ? "Year" : "Years"}
          </span>
          <span className="px-4 py-1 text-sm font-medium text-white bg-black dark:bg-gray-700 rounded-full">
            {questions} Q&A
          </span>
          <span className="px-4 py-1 text-sm font-medium text-white bg-black dark:bg-gray-700 rounded-full">
            Last Updated: {lastUpdated}
          </span>
        </div>
      </div>
    </div>


    )}

    export default RoleInfoHeader
