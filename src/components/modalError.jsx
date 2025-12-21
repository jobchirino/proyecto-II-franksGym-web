import { robotoAuth } from "@/app/auth/page";
import { PiWarningOctagonBold } from "react-icons/pi";
import CloseModal from "./closeModal";

export default function ModalError({error}){
    
    return(
        <dialog open={error} className={`w-full desktop:w-[80%] h-full bg-[#000000a5] z-20 modal-open fixed top-0 desktop:ml-[20%] overflow-hidden`}>
            <section className="w-full h-full modal-son overflow-y-auto flex justify-center items-center">
                <div className="px-6 py-4 bg-[#323032] w-4/5 text-white rounded-lg shadow-[#E50914] desktop:w-2/6">
                    <header className="w-full flex justify-center gap-3 items-center">
                        <PiWarningOctagonBold size={40} color="#E50914"/>
                        <h2 className={`text-3xl ${robotoAuth.className}`}>Error</h2>
                    </header>
                    <section className="flex flex-col gap-3">
                        <div>
                            <ul className="text-sm flex flex-col gap-2">
                                {
                                    Array.isArray(error)?error.map((itemKey) => (
                                        <li key={Object.keys(itemKey)[0]} className="text-[#E50914] font-semibold">
                                                {Object.keys(itemKey)[0]}
                                            {<ul>
                                                {
                                                    itemKey[Object.keys(itemKey)[0]].map(itemValue => (
                                                        <li key={itemValue} className="pl-2 text-white font-normal">
                                                            {itemValue}
                                                        </li>
                                                    ))
                                                }
                                            </ul>}
                                        </li>
                                    )) : <li className="py-3 text-center">{error}</li>
                                }
                            </ul>
                        </div>
                    </section>
                    <div className="w-full flex justify-center">
                        <CloseModal />
                    </div>
                </div>

            </section>
        </dialog>
 
    )
}