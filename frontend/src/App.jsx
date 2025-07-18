import React from 'react'
import {BrowserRouter as Router , Routes,Route} from "react-router-dom"

import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Home/Dashboard'
import InterviewPrep from './pages/InterviewPrep/InterviewPrep'
import UserProvider from './context/useContext'


const App = () => {
  return (
    <UserProvider>
    <div>
      <Router>
          <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path= "/interview-prep/:id" element={<InterviewPrep/>}/>
          </Routes>
      </Router>
    </div>
    </UserProvider>
  )
}

export default App
