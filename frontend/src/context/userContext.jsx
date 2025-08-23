import { createContext,useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance"
import { API_PATHS } from "../utils/apiPaths";

export const UserContext = createContext();

const UserProvider = ({children}) =>{
    
    const [user,setUser]= useState(null)
    const [loading , setLoading] =useState(true)

    useEffect(()=>{
        if (user) return
        const fetchUser = async () =>{
            try{
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE,{
                    withCredentials:true
                }
                )
                setUser(response.data)
                
            }
            catch(error){
                console.error("User not authenticated",error)
                // clearUser()
            }finally{
                setLoading(false)
                
            }
        }
        fetchUser();
    })
    const updateUser = (userData) =>{
        setUser(userData)
        // localStorage.setItem("token",userData.token)
        setLoading(false)
    }
    const clearUser =async ()=>{
        setUser(null)
        // localStorage.removeItem("token")
        try {
            await axiosInstance.post(API_PATHS.AUTH.LOGOUT); // clear cookie from backend
        } catch (error) {
        console.error("Error logging out", error);
        }
    }
    return (
        <UserContext.Provider value ={{user,loading, updateUser,clearUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider