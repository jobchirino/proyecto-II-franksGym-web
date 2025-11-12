'use client'
import { useParams } from "next/navigation";
import { IoPerson, IoHomeSharp } from "react-icons/io5";
import { BsPersonCircle } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { BsPersonFillExclamation } from "react-icons/bs";
import { FaCalendar } from "react-icons/fa";

import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/components/loader";
import ModalError from "@/components/modalError";



export default function AthleteDetail(){
    const { id } = useParams()
    const [athlete, setAthlete] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const membershipTypes = {
        por_dia: "Por Día",
        semanal: "Semanal",
        mensual: "Mensual"
    }
    useEffect(() => {
        axios.get(`/api/athletes/${id}`)
        .then((response) => setAthlete(response.data))
        .catch((error) => setError(error.response.data))
        .finally(() => setLoading(false))
    }, [])
    console.log('aquí el detalle: ', athlete)
    return(
        <>
        {
            loading? 
            <div className="flex flex-grow justify-center items-center">
                <Loader />
            </div> :
       
            <section className="w-5/6 mt-6 rounded-lg py-5 px-8 flex flex-col items-center justify-center bg-[#323032]">    
                <section className="w-full flex gap-3 items-center">
                    <div className="p-5 rounded-full bg-[#842E2E]">
                        <IoPerson color="black" size={40} />
                    </div>
                    <h3 className="text-2xl font-semibold">{athlete.fullName}</h3>
                </section>
                <section className="w-full flex flex-col desktop:flex-row gap-4 pt-10 justify-between desktop:pl-10">
                    <div className="flex flex-col gap-4 desktop:w-2/6">
                        <div className="flex gap-3 items-center">
                            <BsPersonCircle color="white" size={30}/>
                            <p>{athlete.fullName}</p>
                        </div>
                        <div className="flex gap-3 items-center">
                            <MdEmail color="white" size={30}/>
                            <p>{athlete.email}</p>
                        </div>
                        <div className="flex gap-3 items-center">
                            <FaRegAddressCard color="white" size={30}/>
                            <p>CI: {athlete.CI}</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 desktop:w-2/6">
                        <div className="flex gap-3 items-center">
                            <IoHomeSharp color="white" size={30}/>
                            <p>{athlete.addres}</p>
                        </div>
                        <div className="flex gap-3 items-center">
                            <FaPhone color="white" size={30}/>
                            <p>0{athlete.phoneNumber}</p>
                        </div>
                        <div className="flex gap-3 items-center">
                            <BsPersonFillExclamation color="white" size={30}/>
                            <p>0{athlete.emergencyPhoneNumber}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 desktop:w-2/6 desktop:justify-center">
                        <div className="flex gap-3 flex-col items-start">
                            <p className="font-semibold">Estatus de pago:</p>
                            <div className={`${athlete.isPaid? 'bg-[#44FF00]' : 'bg-[#E50914]'} w-2/6 text-center font-semibold py-1 px-2 rounded-lg text-black`}>
                                {athlete.isPaid? 'Pago' : 'Pendiente'}
                            </div>
                        </div>
                        <div className="flex gap-3 flex-col items-start">
                            <p className="font-semibold">Tipo de membresía:</p>
                            <div className="flex gap-3 items-center">
                                <FaCalendar size={30}/>
                                <p>{membershipTypes[athlete.membershipType]}</p>
                            </div>
                        </div>
                    </div>
                </section>
                
                <ModalError error={error}/>
            </section>
        }
        </>
    )
}