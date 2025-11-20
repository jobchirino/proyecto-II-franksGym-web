'use client'
import Input from "@/components/input";
import Loader from "@/components/loader";
import ModalError from "@/components/modalError";
import SuccessModal from "@/components/successModal";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { Roboto_Mono } from "next/font/google";

export const roboto = Roboto_Mono({
  subsets: ["latin"],
  weight: '400'
});

export default function EditProfile(){
    const { data: session} = useSession()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [succesModal, setSuccesModal] = useState(false)
    console.log(session)

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData
        formData.append('email', e.target.email.value)
        formData.append('name', e.target.name.value)

        axios.put(`/api/users/${session.user.id}`, formData)
        .then((response) => setSuccesModal(true))
        .catch((error) => {
            console.log('aquí el error: ', error)
            setError(error.response.data.error)
        })
        .finally(() => setLoading(false))
    }

    const handleClear = (e) => {
        const form = e.target.closest('form')
        if(form) form.reset()
    }
    
    return(
        <>
        {
            loading || !session?
            <div className="flex-grow flex justify-center items-center">
                <Loader />
            </div> :

            <div className="w-5/6 bg-[#323032] rounded-lg mt-3 py-3 flex flex-col gap-3">
                <header className="w-full pb-3 border-b-2 border-b-[#1B1C1F]">
                    <h3 className={`${roboto.className} text-center text-2xl text-[#E50914]`}>Editar Usuario</h3>
                </header>
                <section className="w-full flex items-center gap-3 px-4 ">
                    <div className="p-4 rounded-full bg-[#4C4C4C]">
                        <IoPersonOutline color="#C23D3D" size={50}/>
                    </div>
                    <h3 className="text-3xl font-semibold">{session?.user.name}</h3>
                </section>
                <section className="w-full px-4 pb-4">
                    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                        <div className="w-full gap-5 desktop:w-3/6 flex flex-col desktop:flex-row">
                            <Input 
                                label={'Nombre Completo'}
                                placeholder={'Jhon Doe'}
                                type={'text'}
                                defaulValue={session?.user.name}
                                id={'name'}
                            />
                            <Input 
                                label={'Correo Electrónico'}
                                placeholder={'jhon@email.com'}
                                type={'email'}
                                defaulValue={session?.user.email}
                                id={'email'}
                            />
                        </div>
                        <section className="w-full flex gap-3 justify-center py-3">

                            <button type="button" onClick={handleClear} className="cursor-pointer bg-[#C23D3D] px-2 py-1 rounded-md transition-colors duration-200 hover:bg-[#842E2E]">
                                Restaurar
                            </button>
                            <input 
                                value={'Editar'} 
                                type="submit" 
                                className="bg-[#2B80FF] px-2 py-1 rounded-md cursor-pointer transition-colors duration-200 hover:bg-[#1d48ad]" 
                            />
                        </section>
                    </form>
                </section>
            </div>
        }
        <ModalError error={error} />
        <SuccessModal 
            text={'Usuario Editado Correctamente'}
            modal={succesModal}
            redirectTo={'/auth'}   
            roboto={roboto} 
            setModal={setSuccesModal}
        />
        </>
    )
}