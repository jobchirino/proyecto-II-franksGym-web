'use client'
import Header from "@/components/header";
import Input from "@/components/input";
import { useEffect, useState } from "react";
import { Roboto_Mono } from "next/font/google";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader";
import ModalError from "@/components/modalError";
import axios from "axios";
import useAuth from "./logic";
import Link from "next/link";


export const robotoAuth = Roboto_Mono({
  subsets: ["latin"],
  weight: '400'
});

export default function Login(){
    const [loading, setLoading] = useState(true)
    const [isFirst, setIsFirst] = useState(true)
    const [error, setError]     = useState('')
    const router = useRouter()  
    
    useEffect(() => {
        setLoading(true)
        axios.get('api/users/is-first')
        .then((response) => setIsFirst(response.data.isFirst))
        .catch((error) => setError({error: error.response.data.error}))
        .finally(() => setLoading(false))        
    }, [])

    const { handleLogicLogin, handleLogicRegister } = useAuth(setLoading, setError, router)
    const handleRegister = (e) => {
        handleLogicRegister(e)
    }

    const handleLogin = (e) => {
        handleLogicLogin(e)
    }

  return(
    <>
        {
            loading? 
            <div className="w-full min-h-dvh flex justify-center items-center">
                <Loader />
            </div> :
            
            <div className="w-full min-h-dvh flex flex-col md:flex-row">
            <Header isAuth={true}/>

            <div className="flex-grow flex flex-col items-center gap-2 mb-10 md:justify-center md:mb-0">
                <h2 className={`${robotoAuth.className} text-2xl`}>{ isFirst? 'Regístrate' : 'Iniciar Sesión'}</h2>
                <div className="w-5/6 bg-[#323032] py-7 rounded-lg flex flex-col items-center gap-6 shadow-black shadow-xl desktop:w-3/6 2xl:max-w-2/6 ">
                    <form className="w-[90%] flex flex-col gap-4 px-5 items-center" onSubmit={isFirst? handleRegister : handleLogin}>
                    <div className={`w-full flex flex-col gap-3 items-center`}>
                        <Input 
                            label={"Correo electrónico"}
                            id={'email'}
                            type={'email'}
                            placeholder={'jhon@email.com'}
                        
                        />
                        <Input 
                            label={'Contraseña'}
                            id={'password'}
                            type={'password'}
                            placeholder={'••••••••'}
                        
                        />
                        {
                        isFirst ? 
                            <>
                            <Input 
                                label={'Confirmar contraseña'}
                                id={'confirmPassword'}
                                type={'password'}
                                placeholder={'••••••••'}
                                
                            />
                            <Input 
                                label={'Nombre'}
                                id={'name'}
                                type={'text'}
                                placeholder={'Jhon Doe'}
                                
                            />
                            </> : 
                            <Link href={'/auth/forgot-password'} className="text-sm self-end text-[#E50914] -mt-2">
                                Olvidaste tu contraseña?
                            </Link>
                        }
                    </div>

                    <button className="bg-[#E50914] w-full py-1 rounded-md transition-colors duration-300 cursor-pointer hover:bg-[#842E2E]">
                        {isFirst? 'Registrar' : 'Ingresar'}
                    </button>
                    </form>
                </div>
            </div>
            <ModalError error={error}/>
            </div>
        }
    </>
  )
}