import React from 'react'
import EMPTYIMG from "../../assets/empty.png"
const EmptyDashBoard = () => {
  return (
    <div className='flex justify-center mt-40 md:mt-20 items-center flex-col w-full '>
      <img src={EMPTYIMG} alt='EmptyImg' className= ' w-5/12 md:w-2/12 opacity-50 '/>
      <p className='text-2xl md:text-4xl text-gray-600 font-bold text-center'>No Session Found.</p>
    </div>
  )
}

export default EmptyDashBoard
