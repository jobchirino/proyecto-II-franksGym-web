'use client'
import { Roboto_Mono } from "next/font/google";
import { useState } from "react"
import { RiDeleteBin6Line } from "react-icons/ri";
import Loader from "./loader";
import axios from "axios";
import SuccessModal from "./successModal";
import ModalError from "./modalError";

const roboto = Roboto_Mono({
  subsets: ["latin"],
  weight: '400'
});

export default function ConfirmationModal({id}){
    const [modal, setModal]               = useState(false)
    const [loading, setLoading]           = useState(false)
    const [successModal, setSuccessModal] = useState(false)
    const [error, setError]               = useState(false)
    console.log('aquí la url', `api/athletes/${id}`)
    const handleDelete = (e) => {
        e.preventDefault()
        setLoading(true)
        axios.delete(`/api/athletes/${id}`)
        .then(() => {
            setModal(false)
            setSuccessModal(true)
        }).catch((error) => {
            console.log(error)
            setError(error.response.data.error)
        })
        .finally(() => setLoading(false))
    }
    return(
        <>
        <button onClick={() => setModal(true)} className="bg-[#C23D3D] px-2 py-1 rounded-md cursor-pointer transition-colors duration-200 hover:bg-[#842E2E]">
            Eliminar
        </button>

        <dialog open={modal} className={`w-full h-full  ${loading? 'bg-[#1B1C1F]' : 'bg-[#000000a5]'} z-20 absolute top-0`}>
            { loading ? <div className="w-full h-full flex justify-center items-center"><Loader /></div> :

            <div className="w-full h-full flex justify-center items-center">
                <div className="px-6 py-4 bg-[#323032] w-full text-white rounded-lg shadow-[#E50914] desktop:w-[35%]">
                    <header className="flex gap-2 justify-center items-center w-full">
                        <RiDeleteBin6Line size={30}/>
                        <h2 className={`text-3xl ${roboto.className}`}>Eliminar Atleta</h2>
                    </header>
                    <section className="w-full py-3 flex justify-center items-center flex-col">
                        <p className="text-center">Esta acción no se puede deshacer</p>
                        <p className="text-center font-bold">¿Estás seguro?</p>
                    </section>
                    <section className="w-full flex justify-center items-center gap-3">
                        <button onClick={() => setModal(false)} className="bg-[#C23D3D] px-2 py-1 rounded-md cursor-pointer transition-colors duration-200 hover:bg-[#842E2E]">
                            Cancelar
                        </button>
                        <button onClick={handleDelete} className="bg-[#44FF00] text-black px-2 py-1 rounded-md cursor-pointer transition-colors duration-200 hover:bg-[#3b8620]">
                            Aceptar
                        </button>
                    </section>
                </div>
            </div>
            }
        </dialog>
        <SuccessModal 
            modal={successModal} 
            redirectTo={`/athlete`} 
            setModal={setSuccessModal} 
            text={'Atleta eliminado con exito'}  
            roboto={roboto}  
        />
        <ModalError error={error}/>
        </>
    )
}