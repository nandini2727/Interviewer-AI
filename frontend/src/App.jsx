import {BrowserRouter as Router , Routes,Route} from "react-router-dom"
import {Toaster} from "react-hot-toast"
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Home/Dashboard'
import InterviewPrep from './pages/InterviewPrep/InterviewPrep'
import UserProvider from './context/userContext'
import ThemeProvider from './context/themeContext'


const App = () => {
  return (
    <ThemeProvider>
      <UserProvider>
      <div>
        <Toaster/>
        <Router>
            <Routes>
              <Route path="/" element={<LandingPage/>}/>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path= "/interview-prep/:id" element={<InterviewPrep/>}/>
            </Routes>
        </Router>
      </div>
      </UserProvider>
    </ThemeProvider>
  )
}

export default App
