'use client'
import { useRouter } from "next/navigation";
import { FaRegCircleCheck } from "react-icons/fa6";

export default function SuccessModal({modal, text, setModal, redirectTo, roboto}){
    const router = useRouter()
    const handleModal = () => {
        router.push(redirectTo)
        setModal(false)
    }
    return(
        <dialog open={modal} className="w-full h-full bg-[#000000a5] z-20 absolute top-0">
            <div className="w-full h-full flex justify-center items-center">
                <div className="px-6 py-4 bg-[#323032] w-4/5 text-white rounded-lg shadow-[#E50914] desktop:w-2/6">
                    <header className="w-full flex justify-center">
                        <FaRegCircleCheck size={50}/>
                    </header>
                    <section className="py-3 w-full justify-center items-center">
                        <p className={`text-2xl ${roboto.className} text-center`}>{text}</p>
                    </section>
                    <section className="w-full flex py-2 justify-center">
                        <button onClick={handleModal} className="bg-[#44FF00] text-black px-2 py-1 rounded-md cursor-pointer transition-colors duration-200 hover:bg-[#3b8620]">
                            Aceptar
                        </button>
                    </section>
                </div>
            </div>
        </dialog>
        
    )
}