import React, { useContext, useState } from 'react'
import Input from '../../components/Inputs/Input'
import {ClipLoader} from "react-spinners"
import { UserContext } from '../../context/useContext'

const CreateSessionForm = () => {
    const [role,setRole]= useState("")
    const [experience,setExperience]= useState("")
    const [topicsToFocus,setTopicsToFocus]= useState("")
    const [description,setDescription]= useState("")
    const [errormsg,setErrorMsg] = useState("")

    const {isLoading} =useContext(UserContext)
    const handleSubmit = ()=>{
    }

  return (
    
   <div className=' w-[300px] md:w-[400px] p-2'>
      <h2 className='text-xl md:text-2xl font-semibold mt-4 md:mt-6 text-gray-900 mb-2'>Start a New Interview Journey</h2>
      <p className='text-gray-600 mb-6 text-sm'>Fill out this form and unlock your personalized set of interview question</p>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 md:gap-6'>
        <Input
          value={role}
          onChange={({target})=>{setRole(target.value)}}
          label="Target Role"
          placeholder="e.g. Frontend Developer , Business Analyst etc."
          type="text"/>
        <Input
          value={experience}
          onChange={({target})=>{setExperience(target.value)}}
          label="Years Of Experience"
          placeholder="e.g. 1 year , 2 years etc."
          type="text"/>
          <Input
          value={topicsToFocus}
          onChange={({target})=>{setTopicsToFocus(target.value)}}
          label="Topics to Focus On"
          placeholder="Comma seperated e.g. React,Node.js,MongoDB"
          type="text"/>
          <Input
          value={description}
          onChange={({target})=>{setDescription(target.value)}}
          label="Description"
          placeholder="Any specific goal or note for this session"
          type="text"/>
          {errormsg && <p className='my-2 text-red-600'>{errormsg}</p>}
        <button
            type="submit"
            className="w-full flex items-center justify-center gap-x-2 cursor-pointer bg-[#0F172A] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#1E293B] transition"
            >
            {isLoading && <ClipLoader size={20} color="white" />} 
            Create Session
            </button>

        
      </form>
    </div>

  )
}

export default CreateSessionForm
