import React, { useContext, useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import { UserContext } from '../../context/userContext'
import NoProfile from "../../assets/Default Profile.jpg"

const ProfileInfoCard = () => {
  const {user,clearUser}=useContext(UserContext)
  const navigate = useNavigate()

  const handleLogout =()=>{
    localStorage.clear()
    clearUser()
    navigate("/")
  }
  
const [photoUrl, setPhotoUrl] = useState(NoProfile);
const [displayName, setDisplayName] = useState("");

useEffect(() => {
  if (user?.profilePhotoUrl || user?.profilePhotoUrluser ) {
    setPhotoUrl(user?.profilePhotoUrl || user?.profilePhotoUrluser );
  } else {
    setPhotoUrl(NoProfile);
  }
}, [user?.profilePhotoUrl]);


  return (
    <>
    
    <div className='flex items-center  '>
     
      
      <img key={user?.profilePhotoUrl || "default"}
  src={photoUrl} alt='' className='w-11 h-11 bg-gray-300 rounded-full mr-3'/>
      <div className='text-[15px] flex flex-col dark:text-white text-black font-bold leading-3'>
      {/* First name on mobile */}
      <span className="block md:hidden">
        {user.fullName ? user.fullName.split(' ')[0] : ""}
      </span>
      {/* Full name on md+ screens */}
      <span className="hidden md:block">
        {user.fullName || ""}
      </span>

      <button className='text-amber-600 text-sm font-semibold cursor-pointer hover:underline' onClick={handleLogout}>Logout</button>
            </div>
    </div>
    </>
  )
}

export default ProfileInfoCard
