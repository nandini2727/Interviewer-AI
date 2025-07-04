import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input'
const Login = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [errorMsg,setErrorMsg]=useState("")

  const navigate =useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault()
  }
  return (
    <div className=' w-[300px] md:w-[400px] h-[350px] p-2'>
      <h2 className='text-3xl font-semibold text-center text-gray-900 mb-2'>Welcome Back</h2>
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
        <button
          type="submit"
          className="mt-4 w-[100%]  bg-[#0F172A] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#1E293B] transition"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
