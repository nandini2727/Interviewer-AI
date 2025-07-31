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
    className="w-full max-w-md bg-white rounded-2xl cursor-pointer hover:-translate-1 ease-in-out duration-250 hover:shadow-xl shadow-lg overflow-hidden border border-gray-200"
    onClick={onSelect}
    >
    {/* Top Section with Initials and Delete */}
    <div
    className="flex items-start justify-between bg-[#e0f7f4] px-6 py-4"
    style={{ background: color.bgcolor }}
    >
    <div className="flex items-center gap-4">
        <div className="bg-white text-gray-800 font-bold w-12 h-12 rounded-full flex items-center justify-center shadow-sm">
        {getInitials(role)}
        </div>
        <div>
        <h2 className="text-lg font-semibold text-gray-800">{role}</h2>
        <p className="text-sm text-gray-700">{topicsToFocus}</p>
        </div>
    </div>
    <button
        className="text-pink-600 cursor-pointer p-2 rounded-md hover:bg-pink-100 hover:text-red-500"
        onClick={(e) => {
        e.stopPropagation()
        onDelete()
        }}
    >
        <GoTrash size={18} />
    </button>
    </div>

    {/* Middle Section: Experience + Q&A + Last Updated */}
    <div className="px-5 py-4 flex flex-wrap gap-1 text-[12px] font-medium">
        <span className="px-4 py-1 rounded-full border border-gray-300 text-gray-600">
            Experience: {experienceLevel} {experienceLevel == 1 ? "Year" : "Years"}
        </span>
        <span className="px-4 py-1 rounded-full border border-gray-300 text-gray-600">
            {questions} Q&A
        </span>
        <span className="px-4 py-1 rounded-full border border-gray-300 text-gray-600">
            Last Updated: {lastUpdated}
        </span>
    </div>

    {/* Bottom Description */}
    <div className="px-6 pb-4 text-gray-600 text-sm">
         {description}
    </div>
    </div>


  )
}

export default SummaryCard
