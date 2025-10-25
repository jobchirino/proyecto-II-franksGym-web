'use client'
import Header from "@/components/header";
import Input from "@/components/input";
import { useEffect, useState } from "react";
import { Roboto_Mono } from "next/font/google";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader";
import ModalError from "@/components/modalError";
import axios from "axios";


export const robotoAuth = Roboto_Mono({
  subsets: ["latin"],
  weight: '400'
});

export default function Login(){
    const [isFirst, setIsFirst] = useState(true)
    const [error, setError]     = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()  
    
    useEffect(() => {
        setLoading(true)
        axios.get('api/users/is-first')
        .then((response) => setIsFirst(response.data.isFirst))
        .catch((error) => setError({error: error}))
        .finally(() => setLoading(false))        
    }, [])

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
        formData.append('isFirst', 'true')
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
                <h2 className={`${robotoAuth.className} text-2xl`}>{ isFirst? 'Regístrate' : 'Iniciar Sesión'}</h2>
                <div className="w-5/6 bg-[#323032] py-7 rounded-lg flex flex-col items-center gap-6 shadow-black shadow-xl desktop:w-3/6 2xl:max-w-2/6 ">
                    <form className="w-[90%] flex flex-col gap-6 px-5 items-center" onSubmit={isFirst? handleRegister : handleLogin}>
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
                            </> : ''
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