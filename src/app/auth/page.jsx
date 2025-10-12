'use client'
import Header from "@/components/header";
import Input from "@/components/input";
import { useState } from "react";
import { Roboto_Mono } from "next/font/google";
import { signIn } from "next-auth/react";
import { set } from "zod";
import { redirect, useRouter } from "next/navigation";
import Loader from "@/components/loader";
import { errorMock } from "@/mocks/error";
import ModalError from "@/components/modalError";


export const roboto = Roboto_Mono({
  subsets: ["latin"],
  weight: '400'
});

export default function Login(){
    const [logging, setLogging] = useState(true)
    const [error, setError]     = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()  

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')
        try {
            setLoading(true)
            const response = await signIn('credentials', {
                redirect: false,
                email: e.target.email.value,
                password: e.target.password.value
            })
            if(!response.ok){
                if(response.error === 'CredentialsSignin'){
                    setError({error: 'Email o contraseña invalida'})
                }else{
                    setError({error: "Error desconocido"})
                }
            }
            if(response.ok) router.push('/')
                
        } catch (error) {
            console.log(error)
            setError({error: "Error desconocido"})
        } finally{
            setLoading(false)
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        setError('')
        const formData = new FormData
        formData.append('email', e.target.email.value)
        formData.append('password', e.target.password.value)
        formData.append('confirmPassword', e.target.confirmPassword.value)
        formData.append('name', e.target.name.value)
        console.log('registrando...')

        try {
            setLoading(true)
            const user = await fetch('/api/users/registers', {
                method: 'POST',
                body: formData
            })
            const parsedUser = await user.json()
            console.log(parsedUser)
            if(user.ok){
                const signInResponse = await signIn('credentials', {
                    redirect: false,
                    email: e.target.email.value,
                    password: e.target.password.value
                })
                if(signInResponse.ok) router.push('/')
                if(signInResponse.error) alert('Error desconocido')
            }else{
                setError(parsedUser)
            }

        } catch (error) {
            alert('Error desconocido')
        }finally{
            setLoading(false)
        }
    }

  return(
    <>
        {
            loading? 
            <div className="w-full min-h-dvh flex justify-center items-center">
                <Loader />
            </div> :
            
            <div className="w-full min-h-dvh flex flex-col md:flex-row">
            <Header />
            <div className="flex-grow flex flex-col items-center gap-2 mb-10 md:justify-center md:mb-0">
                <h2 className={`${roboto.className} text-2xl`}>{ logging? 'Iniciar Sesión' : 'Regístrate'}</h2>
                <div className="w-5/6 bg-[#323032] py-7 rounded-lg flex flex-col items-center gap-6 shadow-black shadow-xl desktop:w-3/6 2xl:max-w-2/6 ">
                    <form className="w-[90%] flex flex-col gap-6 px-5 items-center" onSubmit={logging? handleLogin : handleRegister}>
                    <div className={`w-full flex flex-col ${error? 'gap-1' : 'gap-3'}  items-center`}>
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
                        logging? '' :
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
                            </> 
                        }
                    </div>

                    <button className="bg-[#E50914] w-full py-1 rounded-md transition-colors duration-300 cursor-pointer hover:bg-[#842E2E]">
                        {logging? 'Ingresar': 'Registrar'}
                    </button>
                    </form>

                    <button className="w-[90%] text-sm cursor-pointer" onClick={() => setLogging(!logging)}>
                    {
                        logging? 
                        <p>¿No tienes una cuenta? <span className="font-bold">Regístrate</span></p> :
                        <p>¿Ya tienes una cuenta? <span className="font-bold">Inicia Sesión</span></p>
                    }
                    </button>
                </div>
            </div>
            <ModalError error={error}/>
            </div>
        }
    </>
  )
}