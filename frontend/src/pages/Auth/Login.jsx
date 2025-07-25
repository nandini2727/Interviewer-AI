import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import {isEmail,isStrongPassword} from "validator"
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { UserContext } from '../../context/useContext'

const Login = ({setCurrentPage}) => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [errorMsg,setErrorMsg]=useState("")
  const {updateUser} = useContext(UserContext)

  const navigate =useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault()
    
    if(email === "")
      setErrorMsg("Please enter email")
    else if(password === "")
      setErrorMsg("Please enter password")
    else if(!isEmail(email))
        setErrorMsg("Please enter valid email")
    
    else if(!isStrongPassword(password))
      setErrorMsg("Please enter password with min 8 letters, 1 Uppercase , i lower case and  1 special character")
    else{
        setErrorMsg("")
    
        try {
          const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
            email,password
          })
          const {token} = response.data
          if(token){
            localStorage.setItem("token",token)
            updateUser(response.data)
            navigate("/dashboard")
          }
          
        } catch (error) {
          if(error.response && error.response.data.message){
            setErrorMsg(error.response.data.message)
          }
          else{
            setErrorMsg("Something went wrong. Please try again later")
          }
        }
    }
     
    
  }
  return (
    <div className=' w-[300px] md:w-[400px] p-2'>
      <h2 className='text-2xl md:text-3xl font-semibold text-center text-gray-900 mb-2'>Welcome Back</h2>
      <p className='text-gray-600 mb-6 text-center'>Please enter your details to login</p>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <Input
          value={email}
          onChange={({target})=>{setEmail(target.value)}}
          label="Email Address"
          placeholder="susan@gmail.com"
          type="text"/>
        <Input
          value={password}
          onChange={({target})=>{setPassword(target.value)}}
          label="Password"
          placeholder="Min 8 characters"
          type="password"/>
          {errorMsg && <p className='my-2 text-red-600'>{errormsg}</p>}
        <button
          type="submit"
          className=" w-[100%]  bg-[#0F172A] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#1E293B] transition"
        >
          Login
        </button>
        <p className='my-2'>Don't have an account? <span className='text-purple-800 font-semibold cursor-pointer underline' onClick={()=>setCurrentPage("signup")}>Signup</span></p>
      </form>
    </div>
  )
}

export default Login
