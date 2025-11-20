'use client'

import axios from "axios"
import { useState } from "react"
import ModalError from "./modalError"
import SuccessModal from "./successModal"
import Input from "./input"
import Loader from "./loader"

export default function UserForm(){
    const [error, setError]     = useState('')
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const handleClear = (e) => {
        const form = e.target.closest('form')
        if(form) form.reset()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        const formData = new FormData
        formData.append('name', e.target.name.value)
        formData.append('email', e.target.email.value)
        formData.append('password', e.target.password.value)
        formData.append('confirmPassword', e.target.confirmPassword.value)
        axios.post('/api/users/registers', formData)
        .then(() => {
            setSuccess(true)
        })
        .catch((error) => {
            console.log('error desde cat: ', error)
            setError(error.response.data.error)
        }).finally(() => setLoading(false))
    }
    return(
        <>
        {
            loading? 
                <div className="flex w-5/6 h-full justify-center items-center absolute top-0 z-30 bg-[#1B1C1F]">
                    <Loader />
                </div> :
        
        <form className="w-full flex flex-col gap-8" onSubmit={handleSubmit}>
            <section className="w-full flex flex-col desktop:flex-row desktop:justify-around gap-3">
                <div className="w-full desktop:w-2/6 px-3 flex flex-col gap-3">
                    <Input 
                        label={'Nombre Completo'}
                        id={'name'}
                        placeholder={'Jhon Doe'}
                        type={'text'}
                    />
                    <Input 
                        label={'Correo Electrónico'}
                        id={'email'}
                        placeholder={'nombre@email.com'}
                        type={'email'}
                    />
                </div>
                <div className="w-full desktop:w-2/6 px-3 flex flex-col gap-3">
                    <Input 
                        label={'Contraseña'}
                        id={'password'}
                        placeholder={'••••••••'}
                        type={'password'}
                    />
                    <Input 
                        label={'Confirmar Contraseña'}
                        id={'confirmPassword'}
                        placeholder={'••••••••'}
                        type={'password'}
                    />
                </div>
            </section>
            <section className="w-full flex justify-center pb-5 gap-3">
                <button type="button" onClick={handleClear} className="bg-[#2B80FF] px-2 py-1 rounded-md cursor-pointer transition-colors duration-200 hover:bg-[#1d48ad]">
                    Limpiar
                </button>
                <input  
                    type="submit"
                    value={'Registrar'}
                    className="cursor-pointer bg-[#C23D3D] px-2 py-1 rounded-md transition-colors duration-200 hover:bg-[#842E2E]"
                />
                
                
            </section>
        </form>
        }
        <ModalError error={error}/>
        <SuccessModal 
            text={'Usuario registrado correctamente'}
            modal={success}
            setModal={setSuccess}
            redirectTo={'/manage'}
        />
        </>
    )
}