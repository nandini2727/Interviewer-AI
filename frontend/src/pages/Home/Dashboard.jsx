import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import { CARD_BG } from '../../utils/data'
import toast from "react-hot-toast"
import Modal from "react-modal"
import { LuPlus } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import moment from "moment"
import SummaryCard from '../../components/Cards/SummaryCard'
import { RxCross1 } from 'react-icons/rx'
import CreateSessionForm from './CreateSessionForm'
import DeleteAlertContent from './DeleteAlertContent'

const DashBoard = () => {
  const navigate = useNavigate()
  const [openCreateModal,setOpenCreateModal] =useState(false)
  const [sessions,setSessions] = useState([])
  const [openDeleteModal,setOpenDeleteModal] =  useState({
    open:false,
    data:null
  })
  const fetchAllSessions = async()=>{
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL)
      setSessions(response.data.sessions)
    } catch (error) {
      console.error("Error fetching the sessions data :" , error)
    }
  }
  const deleteSession = async (sessionData)=>{
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id))
      toast.success("Session deleted successfully!",{duration:2000})
      setOpenDeleteModal({open:false,data : null})
      fetchAllSessions()

    } catch (error) {
      console.error("Error deleting session data:",error)
    }
  }

  useEffect(()=>{
    fetchAllSessions()
  },[])
  return (
    <div>
      <DashboardLayout>
     <div className=" p-8 md:p-11 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions?.map((data,index)=>(
          <SummaryCard
            key = {data?._id}
            color = {CARD_BG[index % CARD_BG.length]}
            role = {data?.role || ""}
            topicsToFocus = {data?.topicsToFocus || "-"}
            experienceLevel = {data?.experienceLevel || "-"}
            description = {data?.description || "-"}
            questions = {data?.questions?.length || "-"}
            lastUpdated ={data?.updatedAt ? moment(data.updatedAt).format("Do MMM YYYY"): ""}
            onSelect={()=> navigate(`/interview-prep/${data?._id}`)}
            onDelete={()=> setOpenDeleteModal({open:true , data})}
            />

        ))}
      </div>

      <button
        onClick={() => setOpenCreateModal(true)}
        className="fixed bottom-12 cursor-pointer right-9 z-50 bg-blue-600 text-white p-4 md:p-6 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200"
        aria-label="Add Session"
      >
        <LuPlus className="w-5 h-5 md:w-7 md:h-7" />
      </button>

        <Modal
          isOpen ={openCreateModal}
          // onRequestClose={()=>setOpenCreateModal(false)}
          style={{
            overlay:{
              zIndex:100,
              backgroundColor:"rgba(0,0,0,0.75)"
            },
            content:{
              position:'absolute',
              top: '45%',
              left: '50%',
              transform:'translate(-50%,-50%)',
              borderRadius:20,
              height:'fit-content',
              width:'fit-content'
            }
          }}
           >
            <div className='relative'>
              <RxCross1 size={20} className='absolute top-2 right-2 cursor-pointer text-pink-600 hover:text-red-600' onClick={()=>setOpenCreateModal(false)}/>
              <CreateSessionForm/>
            </div>
            </Modal>
            
            <Modal
          isOpen ={openDeleteModal.open}
          onRequestClose={()=>setOpenDeleteModal({open:false,data:null})}

          style={{
             overlay:{
              zIndex:100,
              backgroundColor:"rgba(0,0,0,0.35)"
            },
            content:{
              position:'absolute',
              padding:10,
              top: '45%',
              left: '50%',
              transform:'translate(-50%,-50%)',
              borderRadius:20,
              height:'fit-content',
              width:'fit-content'
            }
          }}
           >
            <div className='relative'>
              <RxCross1 size={20} className='absolute top-2 right-2 cursor-pointer text-pink-600 hover:text-red-600' onClick={()=>setOpenDeleteModal({open:false,data:null})}/>
              <DeleteAlertContent
                title="Delete Alert"
                content="Are you sure you want to delete this session?"
                onDelete={()=>deleteSession(openDeleteModal.data)}
                />
            </div>
            </Modal>
      </DashboardLayout>
    </div>
  )
}

export default DashBoard
