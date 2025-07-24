import { useState } from 'react'
import Input from '../../components/Inputs/Input'
import {useNavigate} from "react-router-dom"
import {ClipLoader} from "react-spinners"
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'

const CreateSessionForm = () => {
    const [role,setRole]= useState("")
    const [experience,setExperience]= useState("")
    const [topicsToFocus,setTopicsToFocus]= useState("")
    const [description,setDescription]= useState("")
    const [errormsg,setErrorMsg] = useState("")
    const [isLoading,setIsLoading]= useState(false)

    const navigate = useNavigate()
    const handleSubmit = async (e)=>{
      e.preventDefault()
      
      if(!role||!experience||!topicsToFocus){
        setErrorMsg("Please Fill all the required fields")
        return
      }
      setErrorMsg("")
      setIsLoading(true)

      try {

        const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS,
          { role,
            experience,
            topicsToFocus,
            numberOfQuestions:10
          })
        
        const generatedQuestions= aiResponse.data 
        const response = await axiosInstance.post(API_PATHS.SESSION.CREATE,
          { role,
            experienceLevel : experience,
            topicsToFocus,
            description ,
            questions:generatedQuestions
          })
          if(response.data?.session?._id){
            navigate(`/interview-prep/${response.data?.session?._id}`)
          }
          

      } catch (error) {
        if(error.response && error.response.data.message){
          setErrorMsg(error.response.data.message)
          
        }
        else{
          setErrorMsg("Something went wrong. Please try later.")
          
        }
      }finally{
        setIsLoading(false)
      }
      
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
