import React, { useEffect, useRef, useState } from 'react'
import {LuPinOff,LuPin,LuSparkles,LuChevronDown} from 'react-icons/lu'
import AiContentResponse from '../../pages/InterviewPrep/components/AiContentResponse'

const QuestionCard = ({
    question,
    answer, 
    onLearnMore,
    isPinned,
    onTogglePin 
}) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const [height,setHeight] = useState(0)
    const contentRef = useRef(null)
    
    useEffect(()=>{
        if(isExpanded){
            const contentHeight = contentRef.current.scrollHeight
            setHeight(contentHeight +10)
        }else{
            setHeight(0)
        }
    },[isExpanded])

    const toggleExpanded = ()=>{
        setIsExpanded(!isExpanded)
    }
  return (
    <>
 <div className="border border-gray-100/60 group  rounded-lg mb-4 overflow-hidden shadow-xl shadow-gray-100/70 p-4 bg-white group transition-all duration-300">
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
    {/* Left: Q + Question Text */}
    <div className="flex items-start gap-3 w-full md:w-3/4">
      <span className="text-lg font-semibold text-gray-600">Q</span>
      <h3
        className="text-base font-medium text-gray-900 cursor-pointer"
        onClick={toggleExpanded}
      >
        {question}
      </h3>
    </div>

    {/* Right: Buttons */}
    <div
      className={`flex gap-3 items-center ${
        isExpanded ? "md:flex" : "md:hidden group-hover:flex"
      }`}
    >
      {/* Pin / Unpin */}
      <button
        className={`text-purple-700 hover:text-purple-900 cursor-pointer transition ${isPinned ? "flex":""}`}
        onClick={onTogglePin}
      >
        {isPinned ? <LuPin /> : <LuPinOff />}
      </button>

      {/* Learn More */}
      <button
        onClick={() => {
          setIsExpanded(true)
          onLearnMore()
        }}
        className="flex items-center cursor-pointer gap-1 px-3 py-1 bg-gradient-to-r from-purple-100 via-blue-100 to-green-100 text-sm text-gray-800 rounded-lg hover:shadow-md transition"
      >
        <LuSparkles className="text-blue-500" />
        <span className="hidden md:inline font-medium">Learn More</span>
      </button>
    </div>

    {/* Chevron Expand */}
    <button
      className="ml-auto md:ml-0 cursor-pointer text-gray-600"
      onClick={toggleExpanded}
    >
      <LuChevronDown
        size={20}
        className={`transform transition-transform duration-300 ${
          isExpanded ? "rotate-180" : ""
        }`}
      />
    </button>
  </div>

  {/* Expandable Answer */}
  <div
    className={`overflow-hidden transition-all duration-300 ${
      isExpanded ? "max-h-[1000px] mt-4" : "max-h-0"
    }`}
    style={{ maxHeight: `${height}px` }}
  >
    <div ref={contentRef} className="text-gray-700 text-sm">

      <AiContentResponse content={answer}/>
    </div>
  </div>
</div>

    </>
  )
}

export default QuestionCard
