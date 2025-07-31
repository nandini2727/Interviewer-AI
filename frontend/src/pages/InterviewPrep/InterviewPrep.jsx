import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom"
import {AnimatePresence, motion} from "framer-motion"
import moment  from "moment"
import {toast} from "react-hot-toast"
import DashboardLayout from "../../components/Layouts/DashboardLayout"
import RoleInfoHeader from './components/RoleInfoHeader'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import QuestionCard from '../../components/Cards/QuestionCard'
import { LuCircleAlert, LuListCollapse } from 'react-icons/lu'
import AiContentResponse from './components/AiContentResponse'
import Drawer from '../../components/Drawer'
import { ClipLoader } from 'react-spinners'
import AiResponsePreview from './components/AiResponsePreview'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const InterviewPrep = () => {
  const {id :sessionId}  = useParams()
  const [sessionData, setSessionData] = useState(null)
  const [errorMsg, setErrorMsg] =  useState(null)

  const [openLearnMoreDrawer,setOpenLearnMoreDrawer] = useState(false)
  const [explanation,setExplanation]= useState(null)

  const [isLoading, setIsLoading] = useState(false)
  const [isUpdateLoader,setIsUpdateLoader] =useState(false)

  const fetchSessionDataById =async() =>{
    try {
      const response =  await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId))
      if(response.data && response.data.session)
        setSessionData(response.data.session)
        
    } catch (error) {
      console.log("Error : ",error)
    }
  }
  const generateConceptExplanation =async (question)=>{
    try {
      setErrorMsg("")
      setExplanation(null)

      setIsLoading(true)
      setOpenLearnMoreDrawer(true)
      const response = await axiosInstance.post(API_PATHS.AI.GENERATE_EXPLANATION,{question,})
      if(response.data){
        console.log(response.data)
        setExplanation(response.data)
      }
    } catch (error) {
      setExplanation(null)
      setErrorMsg("Failed to generate explanation, Try again later")
      console.error("Error:",error)
    }finally{
      setIsLoading(false )
    }
  }

  const toggleQuestionPin = async(questionId)=>{
    try {
      const response = await axiosInstance.post(API_PATHS.QUESTION.PIN(questionId))
      console.log(response)
      if(response.data && response.data.question)
        fetchSessionDataById()
    } catch (error) {
      console.log("Error:",error)
    }
  }

  const uploadMoreQuestions= async () =>{
    setIsUpdateLoader(true)
    try {
      const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS,{
        role:sessionData?.role, 
        experience :sessionData?.experienceLevel, 
        topicsToFocus : sessionData?.topicsToFocus,
        numberOfQuestions :10
      })
      const generatedQuestions =  aiResponse.data

      const response = await axiosInstance.post(API_PATHS.QUESTION.ADD_TO_SESSION,{
        sessionId,
        questions:generatedQuestions})
      if(response.data){
        toast.success("Added more Q&A !!",{duration:2000})
        fetchSessionDataById()
      }

    } catch (error) {
      if(error.response && error.response.data.message){
        setErrorMsg(error.response.data.message)
      }
      else{
        setErrorMsg("Something went wrong. Try again later.")
      }
    }finally{
        setIsUpdateLoader(false)
      }
  }

  useEffect(()=>{
    if(sessionId)
      fetchSessionDataById()
  },[])
  return (
    <div>
      <DashboardLayout>
        <RoleInfoHeader
          role = {sessionData?.role || ""}
          experience = {sessionData?.experienceLevel || "" }
          topicsToFocus = {sessionData?.topicsToFocus || ""}
          questions = {sessionData?.questions.length || ""}
          description ={sessionData?.description || ""}
          lastUpdated = {sessionData?.updatedAt ? moment(sessionData.updatedAt).format("Do MMM YYYY") : ""}
        />

        <div className='container mx-auto p-4 md:p-8'>
          <h2 className='text-lg m-4 font-semibold '>Interview Q & A</h2>
          <div className='grid grid-cols-4 gap-4 md:max-w-3/5'>
            <div
              className={`col-span-12 ${openLearnMoreDrawer ? "md:col-span-7" : "md:col-span-8 "}`}>

                <AnimatePresence>
                  {sessionData?.questions?.map((data,index)=>{
                    return (
                      <motion.div
                        key={data?._id || index}
                        initial={{opacity : 0 , y:-20}}
                        animate = {{opacity:1, y:0}}
                        exit = {{opacity:0 , scale :0.95}}
                        transition ={{
                          duration:0.4,
                          type:"spring",
                          stiffness : 100 ,
                          delay : index * 0.1,
                          damping : 15
                        }}
                        layout
                        layoutId = {`question-${data?._id|| index}`}
                        >
                          
                          <QuestionCard
                            question = {data?.ques }
                            answer = {data?.ans}
                            onLearnMore={()=>{generateConceptExplanation(data?.ques)}}
                            isPinned = {data?.isPinned}
                            onTogglePin = {()=>toggleQuestionPin(data._id)}
                            />
                          
                          {!isLoading && 
                            sessionData?.questions?.length == index +1 && (
                              <div className='flex items-center justify-center mt-5'>
                                <button
                                className='flex items-center gap-3 text-sm text-white font-medium bg-black px-5 py-2 mr-2 rounded text-nowrap cursor-pointer'
                                disabled={isLoading||isUpdateLoader}
                                onClick={uploadMoreQuestions}>
                                  {isUpdateLoader?(
                                    <ClipLoader color="white" size={20}/>):(
                                      <LuListCollapse size={20}/>
                                  )}{""} Load More
                                </button>
                              </div>
                              
                            )}
                        </motion.div>
                    )

                  })|| (
                    <div className='flex flex-col gap-3 '>
                      <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
                        <Skeleton containerClassName="flex-1" height={50} count={6} style={{"line-height":3}} width="w-3/4"/>
                        
                      </SkeletonTheme>
                    </div>  
                  )}
                </AnimatePresence>
            </div>
          </div>
        </div>
        <div className=''>
          <Drawer
          isOpen={openLearnMoreDrawer}
          onClose={()=>setOpenLearnMoreDrawer(false)}
          title={!isLoading && explanation &&( explanation[0]?.title)}
          >
            {errorMsg &&(
              <p className='flex gap-2 text-sm text-amber-600 font-medium'>
                <LuCircleAlert className='mt-1'/> {errorMsg}
              </p>
            )}
            {isLoading && (
            <div className='flex flex-col gap-3 '>
              <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
                <Skeleton containerClassName="flex-1" height={22} width={"50%"}/>
                <Skeleton containerClassName="flex-1" height={18} count={8}/>
                <Skeleton containerClassName="flex-1" height={18} width={"35%"}/>
                <Skeleton containerClassName="flex-1" height={48} />
                <Skeleton containerClassName="flex-1" height={18} count={9}/>
                <Skeleton containerClassName="flex-1" height={18} width={"35%"}/>
                <Skeleton containerClassName="flex-1" height={48} />
              </SkeletonTheme>
            </div>  
            )}
            {!isLoading && explanation && (
              <AiResponsePreview content = {explanation[0]?.explanation}/>
            )}
          </Drawer>
        </div>
      </DashboardLayout>
    </div>
  )
}

export default InterviewPrep
