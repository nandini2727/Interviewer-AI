import React from 'react'
import { GoTrash } from "react-icons/go";
import { getInitials } from '../../utils/helper'

const SummaryCard = ({
    color,
    role,
    topicsToFocus,
    experienceLevel,
    description, 
    questions, 
    lastUpdated ,
    onSelect,
    onDelete
}) => {
  return (
    <div
    className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl cursor-pointer 
                hover:-translate-1 ease-in-out duration-250 hover:shadow-xl shadow-lg 
                overflow-hidden border border-gray-200 dark:border-gray-700"
    onClick={onSelect}
    >
    {/* Top Section with Initials and Delete */}
    <div
        className="flex items-start justify-between bg-[#e0f7f4] dark:bg-gray-800 px-6 py-4"
        style={{ background: color.bgcolor }}
    >
        <div className="flex items-center gap-4">
        <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 
                        font-bold w-12 h-12 rounded-full flex items-center justify-center shadow-sm">
            {getInitials(role)}
        </div>
        <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {role}
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-400">{topicsToFocus}</p>
        </div>
        </div>
        <button
        className="text-pink-600 dark:text-red-950 cursor-pointer p-2 rounded-md 
                    hover:bg-pink-100 dark:hover:bg-gray-700 hover:text-red-300"
        onClick={(e) => {3
            e.stopPropagation()
            onDelete()
        }}
        >
        <GoTrash size={18} />
        </button>
    </div>

    {/* Middle Section: Experience + Q&A + Last Updated */}
    <div className="px-5 py-4 flex flex-wrap gap-1 text-[12px] font-medium">
        <span className="px-4 py-1 rounded-full border border-gray-300 dark:border-gray-600 
                        text-gray-600 dark:text-gray-300">
        Experience: {experienceLevel} {experienceLevel == 1 ? "Year" : "Years"}
        </span>
        <span className="px-4 py-1 rounded-full border border-gray-300 dark:border-gray-600 
                        text-gray-600 dark:text-gray-300">
        {questions} Q&A
        </span>
        <span className="px-4 py-1 rounded-full border border-gray-300 dark:border-gray-600 
                        text-gray-600 dark:text-gray-300">
        Last Updated: {lastUpdated}
        </span>
    </div>

    {/* Bottom Description */}
    <div className="px-6 pb-4 text-gray-600 dark:text-gray-400 text-sm">
        {description}
    </div>
    </div>



  )
}

export default SummaryCard
