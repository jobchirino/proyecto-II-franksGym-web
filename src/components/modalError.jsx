import { roboto } from "@/app/auth/page";
import { PiWarningOctagonBold } from "react-icons/pi";
import { array } from "zod";

export default function ModalError({error}){
    console.log('aqui el error' ,error)
    return(
        <dialog open={error} className="w-full h-dvh bg-[#000000a5]">
            <div className="w-full h-full flex justify-center items-center">
                <div className="px-6 py-4 bg-[#323032] w-4/5 text-white rounded-lg shadow-[#E50914] desktop:w-2/6">
                    <header className="w-full flex justify-center gap-3 items-center">
                        <PiWarningOctagonBold size={40} color="#E50914"/>
                        <h2 className={`text-3xl ${roboto.className}`}>Error</h2>
                    </header>
                    <section className="flex flex-col gap-3">
                        <div>
                            <ul className="text-sm flex flex-col gap-2">
                                {
                                    Array.isArray(error.error)?error.error.map((itemKey) => (
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
                                    )) : <li className="py-3 text-center">{error.error}</li>
                                }
                            </ul>
                        </div>
                        <form method="dialog" className="w-full flex justify-center">
                            <button className="cursor-pointer bg-[#C23D3D] px-3 py-1 rounded-md shadow-lg shadow-black">Aceptar</button>
                        </form>
                    </section>
                    </div>

                </div>
            </dialog>
 
    )
}