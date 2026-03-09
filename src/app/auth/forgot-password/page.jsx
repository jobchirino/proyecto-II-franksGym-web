'use client'
import Input from "@/components/input";
import { robotoAuth } from "../page";
import Loading from "../loading";
import ModalError from "@/components/modalError";
import { useState } from "react";
import axios from "axios";
import SuccessModal from "@/components/successModal";

export default function ForgotPassword(){
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        const formData = new FormData()
        formData.append('email', e.target.email.value)
        
        axios.post('/api/users/forgot-password', formData)
        .then((res) => {
            console.log(res)
            setSuccess({
                message: res.data.message,
                success: true
            })
        })
        .catch((err) => {
            console.log('aquí el error: ', err)
            setError(err.response.data.error ?? 'Error al procesar tu solicitud. Por favor, intenta nuevamente más tarde.')
        })
        .finally(() => {
            setLoading(false)
        })
    }

    return(
        <>
        {
        loading ? <Loading /> :
        <>
        <div className="flex-grow flex flex-col items-center gap-2 mb-10 md:justify-center md:mb-0">
            <h2 className={`${robotoAuth.className} text-2xl w-full text-center mb-5`}>
                Reestablecer Contraseña
            </h2>
            <p className="text-sm text-gray-300 w-3/6 text-center">Escribe tu correo electronico para recibir instrucciones de restablecimiento.</p>
            <div className="w-5/6 bg-[#323032] py-7 rounded-lg flex flex-col items-center gap-6 shadow-black shadow-xl desktop:w-3/6 2xl:max-w-2/6 ">
                <form onSubmit={handleSubmit} className="w-[90%] flex flex-col gap-4 px-5 items-center">
                    <div className={`w-full flex flex-col gap-3 items-center`}>
                        <Input 
                            label={"Correo electrónico"}
                            id={'email'}
                            type={'email'}
                            placeholder={'jhon@email.com'} 
                        />
                    </div>
                    <input 
                        type="submit" 
                        value={'Enviar instrucciones'}
                        className="bg-[#C23D3D] px-2 py-1 rounded-md cursor-pointer transition-colors duration-200 hover:bg-[#842E2E]"
                    />
                </form>
            </div>
        </div>
        <ModalError error={error}/>
        <SuccessModal 
            modal={success.success}
            setModal={setSuccess}
            text={success.message}
            redirectTo={'/auth/forgot-password'}
        />
        </>       
        }
        </>
    )
}