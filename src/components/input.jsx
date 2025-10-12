'use client'
import { useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

export default function Input({label, id, type, placeholder}){
    const [censured, setCensured] = useState(type === "password"? true : false)
    const passwordType = censured? "password" : "text"
    return(
        <div className="w-full relative">
            <label htmlFor={id}>
                {label}
                <input 
                  type={type !== "password"? type : passwordType}
                  id={id} 
                  name={id}
                  placeholder={placeholder}
                  className="outline-none bg-[#727272] rounded-md pl-2 h-8 w-full"
                  required
                />
            </label>
            {
                type === "password"? 
                    censured?
                        <FaRegEye color={"white"} size={18} onClick={() => setCensured(false)} className="absolute right-3 top-8 cursor-pointer"/>:
                        <FaRegEyeSlash color={"white"} size={18} onClick={() => setCensured(true)} className="absolute right-3 top-8 cursor-pointer"/>
                    
                    :  ''
            }
        </div>
    )
}

/* 
 
*/