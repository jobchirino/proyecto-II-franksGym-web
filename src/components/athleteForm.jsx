'use client'
import { useRouter } from "next/navigation"
import Input from "./input"
import axios from "axios"
import { useState } from "react"
import Loader from "./loader"
import ModalError from "./modalError"

export default function AthleteForm({edit, defaultValue, id}){
    const router = useRouter()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    
    const handleSubmitRegister = (e, formData) => {
        e.preventDefault();
        setLoading(true);
        axios.post('/api/athletes', formData)
        .then((response) => {
            alert("Atleta creado con éxito")
            console.log(response.data)
        }).catch((error) => {
            if(Array.isArray(error.response.data.error)) setError(error.response.data.error)
            if(error.response.status === 409) setError({error: error.response.data.error})
            if(error.response.status === 500) setError({error: "Error descnonocido"})
        }).finally(() => setLoading(false)) 
        
    }

    const handleSubmitEdit = (e, formData) => {
        setLoading(true)
        e.preventDefault()
        axios.put(`/api/athletes/${id}`, formData)
        .then(() => {
            router.push(`/athlete/${id}`)
            router.refresh()
        })
        .catch((error) => {
            console.log('aquí el error desde el com:', error)
            setLoading(false)
            setError(error.response.data.error)
        })
    }
    const handleSubmit = (e) => {
        const formData = new FormData
        formData.append('CI', e.target.CI.value)
        formData.append('fullName', e.target.fullName.value)
        formData.append('addres', e.target.addres.value)
        formData.append('phoneNumber', e.target.phoneNumber.value)
        formData.append('emergencyPhoneNumber', e.target.emergencyPhoneNumber.value)
        formData.append('email', e.target.email.value)
        formData.append('isPaid', 'true')
        formData.append('membershipType', e.target.membershipType.value)
        edit?
        handleSubmitEdit(e, formData) : 
        handleSubmitRegister(e, formData)
    }
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
            <form className="pt-3 pb-5 px-5 flex flex-col gap-3" onSubmit={handleSubmit}>
                <section className="w-full desktop:flex desktop:justify-around">
                    <div className="desktop:w-2/5 flex flex-col gap-3">
                        <Input 
                            label={"Nombre Completo"}
                            placeholder={"Juan Perez"}
                            id={"fullName"}
                            type={"text"}
                            defaulValue={defaultValue?.fullName}
                        />
                        <Input 
                            label={"Cédula"}
                            placeholder={"10000000"}
                            id={"CI"}
                            type={"number"}
                            defaulValue={defaultValue?.CI}
                        />
                        <Input 
                            label={"Correo Electrónico"}
                            placeholder={"nombre@email.com"}
                            id={"email"}
                            type={"email"}
                            defaulValue={defaultValue?.email}
                        />
                    </div>
                    <div className="desktop:w-2/5 flex flex-col gap-3">
                        <Input 
                            label={"Teléfono"}
                            placeholder={"04120000000"}
                            id={"phoneNumber"}
                            type={"number"}
                            defaulValue={defaultValue?`0${defaultValue.phoneNumber}`: ''}
                        />
                        <Input 
                            label={"Teléfono de Emergencias"}
                            placeholder={"04120000000"}
                            id={"emergencyPhoneNumber"}
                            type={"number"}
                            defaulValue={defaultValue?`0${defaultValue.emergencyPhoneNumber}`: ''}
                        />
                        <Input 
                            label={"Dirección"}
                            placeholder={"La vela, calle #"}
                            id={"addres"}
                            type={"text"}
                            defaulValue={defaultValue?.addres}
                        />
        
                        <label htmlFor="membershipType" className="flex flex-col">
                            Tipo de membresía
                            <select defaultValue={defaultValue?.membershipType} name="membershipType" id="membershipType" className="outline-none bg-[#727272] rounded-md pl-2 h-8 w-full">
                                <option value="por_dia">Por día</option>
                                <option value="semanal">Semanal</option>
                                <option value="mensual">Mensual</option>
                            </select>
                        </label>
                    </div>
        
                </section>
                <div className="w-full flex gap-3 justify-center items-center pt-3">
                    <button type="button" className="bg-[#2B80FF] px-2 py-1 rounded-md cursor-pointer transition-colors duration-200 hover:bg-[#1d48ad]" onClick={handleClear}>
                        {edit? 'Restaurar' : 'Limpiar'}
                    </button>
                    <input type="submit" value={edit? "Editar" : "Registrar"} className="cursor-pointer bg-[#C23D3D] px-2 py-1 rounded-md transition-colors duration-200 hover:bg-[#842E2E]"/>
                </div>
            </form>
        </div>
        }
        <ModalError error={error} />
        </>
        
    )
}