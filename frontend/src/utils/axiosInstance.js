import axios from "axios"
import { BASE_URL } from "./apiPaths"

const axiosInstance = axios.create({
    baseURL:BASE_URL,
    timeout:80000, //80 SEC
    headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
    }
})

//REQUEST INTERCEPTOR

axiosInstance.interceptors.request.use(
    (config) =>{
        const accessToken =localStorage.getItem("token")
        if(accessToken)
            config.headers.Authorization = `Bearer ${accessToken}`
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)

// RESPONSE INTERSEPTOR

axiosInstance.interceptors.response.use(
    (response)=>{
        return response
    },
    (error)=>{
        if(error.response){
            if(error.response.status ===401){
                window.location.href = "/"
            }
            else if(error.response.status === 500){
                console.error("Server error. Please try again later")
            }
        }
        else if(error.code === "ECONNABORTED"){
            console.error("Request timeout. Please try again later")
        }
        return Promise.reject(error)
    }
)

export default axiosInstance