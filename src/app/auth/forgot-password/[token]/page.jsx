'use client'
import Input from "@/components/input";
import { robotoAuth } from "../../page";
import { useParams } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import ModalError from "@/components/modalError";
import SuccessModal from "@/components/successModal";
import Loading from "../../loading";

export default function ResetPasswordPage(){
    const { token } = useParams()
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        const formData = new FormData()
        formData.append('password', e.target.password.value)
        formData.append('confirmPassword', e.target.confirmPassword.value)
        formData.append('token', token)

        axios.post('/api/users/forgot-password/reset-password', formData)
        .then((response) => {
            setSuccess(true)
            console.log(response.data)
        })
        .catch((error) => {
            setError(error.response.data.error ?? 'Error al procesar tu solicitud. Por favor, intenta nuevamente más tarde.')
            console.log('There was an error!', error);
        })
        .finally(() => {
            setLoading(false)
        })

    }
    return(
        <>
        {
            loading? <Loading /> :
            <div className="flex-grow flex flex-col items-center gap-2 mb-10 md:justify-center md:mb-0">
                <h2 className={`${robotoAuth.className} text-2xl w-full text-center mb-5`}>
                    Reestablecer Contraseña
                </h2>
                <div className="w-5/6 bg-[#323032] py-7 rounded-lg flex flex-col items-center gap-6 shadow-black shadow-xl desktop:w-3/6 2xl:max-w-2/6 ">
                    <form onSubmit={handleSubmit} className="w-[90%] flex flex-col gap-4 px-5 items-center">
                    <div className={`w-full flex flex-col gap-3 items-center`}>
                        <Input 
                            label={"Nueva Contraseña"}
                            id={'password'}
                            type={'password'}
                            placeholder={'••••••••'} 
                        />
                        <Input 
                            label={"Confirmar Nueva Contraseña"}
                            id={'confirmPassword'}
                            type={'password'}
                            placeholder={'••••••••'} 
                        />
                    </div>
                    <input type="submit" value={'Reestablecer contraseña'} className="bg-[#C23D3D] px-2 py-1 rounded-md cursor-pointer transition-colors duration-200 hover:bg-[#842E2E]"/>
                    </form>
                </div>
            </div>
        }
        <ModalError error={error}/>
        <SuccessModal 
            modal={success}
            setModal={setSuccess}
            text={'Contraseña reestablecida correctamente'}
            redirectTo={'/auth'}
        />
        </>
    )
}