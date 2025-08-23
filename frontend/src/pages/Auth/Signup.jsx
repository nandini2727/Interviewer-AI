import { useState } from 'react'
import Input from '../../components/Inputs/Input'
import ProfilePhotoPlaceholder from '../../components/Inputs/ProfilePhotoPlaceholder'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { useNavigate } from 'react-router-dom'
import uploadImage from '../../utils/uploadImage'
import {isEmail ,isStrongPassword} from "validator"

const Signup = ({setCurrentPage}) => {
  const [profilePhoto,setProfilePhoto]=useState(null)
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [fullName,setFullName]=useState("")
  const [errormsg,setErrorMsg]=useState("")
  const navigate = useNavigate()

  const {updateUser} = useContext(UserContext)

  const handleGoogleLogin=()=>{
    window.location.href = `${import.meta.env.VITE_BASE_URL}${API_PATHS.GOOGLE_AUTH.AUTH}`;
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    let profilePhotoUrl;
    if(fullName === "")
      setErrorMsg("Please enter full name")
    else if(email === "")
      setErrorMsg("Please enter email")
    else if(password === "")
      setErrorMsg("Please enter password")
    else if(!isEmail(email))
        setErrorMsg("Please enter valid email")
    
    else if(!isStrongPassword(password))
      setErrorMsg("Please enter password with at least 8 letters, 1 uppercase , 1 lower case and  1 special character")
    else{
        setErrorMsg("")
        try {
          if(profilePhoto){
            const imgUploadRes =await uploadImage(profilePhoto)
            profilePhotoUrl = imgUploadRes.imageUrl || ""
          }
          const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
            profilePhotoUrl,
            fullName,
            email,
            password
          },{withCredentials:true})
          // const {token} = response.data
          // if(token){
          //   localStorage.setItem("token",token)
            updateUser(response.data)
            navigate("/dashboard")
          // }
          

        } catch (error) {
          if(error.response && error.response.data.message){
            console.log(error.response.data.error)
            setErrorMsg(error.response.data.message)
          }
          else
            setErrorMsg("Something went wrong. Please try again later.")
        }
    }

  }
  return (
  <>
    <div className="w-[350px] md:w-[400px] p-8 bg-[#0F172A] rounded-2xl shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-white mb-2">
        Create An Account
      </h2>
      <p className="text-gray-300 mb-4 text-center">
        Join us today by entering your details below
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <ProfilePhotoPlaceholder image={profilePhoto} setImage={setProfilePhoto} />

        <Input
          value={fullName}
          onChange={({ target }) => {
            setFullName(target.value);
          }}
          label="Full Name"
          placeholder="Susan Doe"
          type="text"
        />
        <Input
          value={email}
          onChange={({ target }) => {
            setEmail(target.value);
          }}
          label="Email Address"
          placeholder="susan@gmail.com"
          type="text"
        />
        <Input
          value={password}
          onChange={({ target }) => {
            setPassword(target.value);
          }}
          label="Password"
          placeholder="Min 8 characters"
          type="password"
        />

        {errormsg && <p className="my-2 text-red-400">{errormsg}</p>}

        {/* Signup Button */}
        <button
          type="submit"
          className="mt-4 w-full cursor-pointer bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Sign Up
        </button>

        {/* Google Login Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex cursor-pointer items-center justify-center gap-2 border border-gray-600 rounded-md py-2 px-4 hover:bg-gray-800 transition"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-gray-200 font-medium">Continue with Google</span>
        </button>

        <p className="my-2 text-gray-300 text-center">
          Already have an account?{" "}
          <span
            className="text-blue-400 font-semibold cursor-pointer underline"
            onClick={() => setCurrentPage("login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  </>

  )
}

export default Signup
