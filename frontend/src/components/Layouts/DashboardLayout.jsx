import React, { useContext } from 'react'
import Header from "./Header"
import { UserContext } from '../../context/userContext'

const DashboardLayout = ({children}) => {
    const {user} =useContext(UserContext)

  return (
    <div>
      <Header/>
        {user && <div>{children}</div>}  
    </div>
  )
}

export default DashboardLayout
