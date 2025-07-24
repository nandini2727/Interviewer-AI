import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom"
import {AnimatePresence, motion} from "framer-motion"
import moment  from "moment"
import {toast} from "react-hot-toast"
// import {LuCircleAlert, LuListCollapse} from "react-icons"
import DashboardLayout from "../../components/Layouts/DashboardLayout"
import RoleInfoHeader from './components/RoleInfoHeader'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'

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
  const generateConceptExplanation =async (question)=>{}

  const toggleQuestionPin = async(questionId)=>{}

  const uploadMoreQuestions= async () =>{}

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
      </DashboardLayout>
    </div>
  )
}

export default InterviewPrep
