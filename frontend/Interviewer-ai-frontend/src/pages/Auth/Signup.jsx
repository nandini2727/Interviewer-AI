import { useState } from 'react'
import Input from '../../components/Inputs/Input'
import ProfilePhotoPlaceholder from '../../components/Inputs/ProfilePhotoPlaceholder'

const Signup = ({setCurrentPage}) => {
  const [profilePhoto,setProfilePhoto]=useState(null)
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [fullName,setFullName]=useState("")

  const handleSubmit =(e)=>{
    e.preventDefault();
  }
  return (
    <div>
       <div className='w-[350px] md:w-[400px]  p-2'>
        <h2 className='text-3xl font-semibold text-center text-gray-900 mb-2'>Create An Account</h2>
        <p className='text-gray-600 mb-6 text-center'>Join us today by entering your details below</p>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
           <ProfilePhotoPlaceholder image={profilePhoto} setImage={setProfilePhoto}/>
            <Input
            value={fullName}
            onChange={({target})=>{setFullName(target.value)}}
            label="Full Name"
            placeholder="Susan doe"
            type="text"/>
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
            SignUp
          </button>
          <p className='my-2'>Already have an account? <span className='text-purple-800 font-semibold cursor-pointer underline' onClick={()=>setCurrentPage("login")}>Login</span></p>
        </form>
        
      </div>
    </div>
  )
}

export default Signup
