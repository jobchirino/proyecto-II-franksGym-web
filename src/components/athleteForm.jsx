'use client'
import Input from "./input"
import axios from "axios"
import { useState } from "react"
import Loader from "./loader"
import ModalError from "./modalError"
import SuccessModal from "./successModal"
import { de } from "zod/v4/locales"

export default function AthleteForm({ edit, defaultValue, id }) {
    const [error, setError] = useState('')
    const [succes, setSucces] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isPaid, setIsPaid] = useState(defaultValue?.isPaid)

    const handleSubmitRegister = (e, formData) => {
        e.preventDefault();
        setError('')
        setLoading(true);
        axios.post('/api/athletes', formData)
            .then((response) => {
                setSucces(true)
                e.target.reset()
                console.log(response.data)
            }).catch((error) => {
                setError(error.response.data.error)
                // returnError(error, setError)
            }).finally(() => setLoading(false))

    }

    const handleSubmitEdit = (e, formData) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        axios.put(`/api/athletes/${id}`, formData)
            .then(() => {
                setSucces(true)
            })
            .catch((error) => {
                console.log('aquí el error desde el com:', error)
                setLoading(false)
                // returnError(error, setError)
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
        formData.append('membershipType', e.target.membershipType.value)
        formData.append('isPaid', e.target.isPaid ? e.target.isPaid.checked : true)
        edit ?
            handleSubmitEdit(e, formData) :
            handleSubmitRegister(e, formData)
    }
    const handleClear = (e) => {
        const form = e.target.closest('form')
        if (form) form.reset()
    }
    const succesText = edit ? 'Atleta editado correctamente' : 'Atleta registrado correctamente'
    const succesRedirectTo = edit ? `/athlete/${id}` : '/newAthlete'
    return (
        <>
            <div className="w-5/6 bg-[#323032] rounded-lg mt-3 relative">
                {loading &&
                    <div className="absolute inset-0 z-10 flex justify-center items-center bg-[#323032]/80 rounded-lg">
                        <Loader />
                    </div>
                }
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
                                        defaulValue={defaultValue ? `0${defaultValue.phoneNumber}` : ''}
                                    />
                                    <Input
                                        label={"Teléfono de Emergencias"}
                                        placeholder={"04120000000"}
                                        id={"emergencyPhoneNumber"}
                                        type={"number"}
                                        defaulValue={defaultValue ? `0${defaultValue.emergencyPhoneNumber}` : ''}
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
                                    {edit && <label htmlFor="isPaid" className="flex flex-col items-center gap-1">
                                        <p>¿Membresía pagada?</p>
                                        <div className="flex gap-2 items-center">
                                            <p className={`${isPaid ? 'text-green-500' : 'text-red-500'}`}>{isPaid ? "Pagada" : "Pendiente"}</p>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="isPaid"
                                                    id="isPaid"
                                                    className="sr-only peer"
                                                    defaultChecked={defaultValue?.isPaid}
                                                    onChange={() => setIsPaid((prevState) => !prevState)}
                                                />
                                                <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all ${isPaid ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                            </label>
                                        </div>
                                    </label>}

                                </div>

                            </section>
                            <div className="w-full flex gap-3 justify-center items-center pt-3">
                                <button type="button" className="bg-[#2B80FF] px-2 py-1 rounded-md cursor-pointer transition-colors duration-200 hover:bg-[#1d48ad]" onClick={handleClear}>
                                    {edit ? 'Restaurar' : 'Limpiar'}
                                </button>
                                <input type="submit" aria-label={edit ? "Editar" : "Registrar"} value={edit ? "Editar" : "Registrar"} className="cursor-pointer bg-[#C23D3D] px-2 py-1 rounded-md transition-colors duration-200 hover:bg-[#842E2E]" />
                            </div>
                        </form>
            </div>
            <ModalError error={error} setError={setError} />
            <SuccessModal
                text={succesText}
                redirectTo={succesRedirectTo}
                modal={succes}
                setModal={setSucces}
            />
        </>

    )
}
