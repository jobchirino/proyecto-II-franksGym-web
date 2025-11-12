'use client'
import Input from "@/components/input";
import useNewAthlete from "./logic";
import { useState } from "react";
import Loader from "@/components/loader";
import ModalError from "@/components/modalError";

export default function NewAthlete(){
    const [loading, setLoading] = useState(false)
    const [error, setError]     = useState('')
    const { handleSubmit } = useNewAthlete(setLoading, setError)
    const handleSubmitAthlete = (e) => handleSubmit(e)

    const handleClear = (e) => {
        const form = e.target.closest('form')
        if(form) form.reset()
    }
    return(
        <>
        {
        loading?
            <div className="flex flex-grow justify-center items-center">
                <Loader />
            </div> :
        <div className="w-5/6 bg-[#323032] rounded-lg mt-3">
            <h3 className="text-2xl text-[#E50914] text-center border-b-2 border-b-[#1B1C1F] py-3">Formulario de Inscripción</h3>
            <form className="pt-3 pb-5 px-5 flex flex-col gap-3" onSubmit={handleSubmitAthlete}>
                <section className="w-full desktop:flex desktop:justify-around">
                    <div className="desktop:w-2/5 flex flex-col gap-3">
                        <Input 
                            label={"Nombre Completo"}
                            placeholder={"Juan Perez"}
                            id={"fullName"}
                            type={"text"}
                        />
                        <Input 
                            label={"Cédula"}
                            placeholder={"10000000"}
                            id={"CI"}
                            type={"number"}
                        />
                        <Input 
                            label={"Correo Electrónico"}
                            placeholder={"nombre@email.com"}
                            id={"email"}
                            type={"email"}
                        />
                    </div>
                    <div className="desktop:w-2/5 flex flex-col gap-3">
                        <Input 
                            label={"Teléfono"}
                            placeholder={"04120000000"}
                            id={"phoneNumber"}
                            type={"text"}
                        />
                        <Input 
                            label={"Teléfono de Emergencias"}
                            placeholder={"04120000000"}
                            id={"emergencyPhoneNumber"}
                            type={"text"}
                        />
                        <Input 
                            label={"Dirección"}
                            placeholder={"La vela, calle #"}
                            id={"addres"}
                            type={"text"}
                        />

                        <label htmlFor="membershipType" className="flex flex-col">
                            Tipo de membresía
                            <select name="membershipType" id="membershipType" className="outline-none bg-[#727272] rounded-md pl-2 h-8 w-full">
                                <option value="por_dia">Por día</option>
                                <option value="semanal">Semanal</option>
                                <option value="mensual">Mensual</option>
                            </select>
                        </label>
                    </div>

                </section>
                <div className="w-full flex gap-3 justify-center items-center pt-3">
                    <button type="button" className="bg-[#2B80FF] px-2 py-1 rounded-md cursor-pointer" onClick={handleClear}>Limpiar</button>
                    <input type="submit" value={"Registrar"} className="cursor-pointer bg-[#C23D3D] px-2 py-1 rounded-md"/>
                </div>
            </form>
        </div>
        }
        <ModalError error={error} />
        </>
    )
}