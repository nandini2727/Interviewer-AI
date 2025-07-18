import { useState } from "react";
import { FaRegEye ,FaRegEyeSlash} from "react-icons/fa";

const Input=( {value,onChange,label,placeholder,type})=>{

    const [showPassword,setShowPassword]=useState(false);
    const toggleShowPassword = ()=>{
        setShowPassword(!showPassword);
    }
    return(
        <div>
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">{label}</label>
                <div className="relative">
                    <input placeholder={placeholder}
                        value={value}
                        onChange={(e)=> onChange(e)}
                        type={type==="password" ? (showPassword? "text" : "password" ):type}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition-colors duration-200"
                        />
                        {type ==="password" && 
                        <>
                        {
                            showPassword?
                        <FaRegEye
                            size={22}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                            onClick={toggleShowPassword}
                        />:
                        <FaRegEyeSlash
                            size={22}
                             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                            onClick={toggleShowPassword}
                        />
                        }
                        
                        </>
                        }
                </div>    
            </div>
        </div>
    )
}
export default Input