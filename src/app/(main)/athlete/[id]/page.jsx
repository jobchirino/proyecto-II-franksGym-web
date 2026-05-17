import { IoPerson, IoHomeSharp } from "react-icons/io5";
import { BsPersonCircle } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { BsPersonFillExclamation } from "react-icons/bs";
import { FaCalendar } from "react-icons/fa";
import { getAthlete } from "./layout";
import Link from "next/link";
import ConfirmationModal from "@/components/confirmationModal";



export default async function AthleteDetail({params}){
    const membershipTypes = {
        por_dia: "Por Día",
        semanal: "Semanal",
        mensual: "Mensual"
    }
    const { id } = await params
    const athlete = await getAthlete(id)
    const date = new Date(athlete.lastPaymentDate).toLocaleDateString('es-ES')
    return(
        <>
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
                            <div className={`${athlete.isPaid? 'bg-[#44FF00]' : 'bg-[#E50914]'} desktop:w-auto w-2/6 text-center font-semibold py-1 px-2 rounded-lg text-black`}>
                                {athlete.isPaid? 'Pago' : 'Pendiente'}
                            </div>
                            <p className="text-start text-md text-gray-400">Última fecha de pago: {date}</p>
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
                
            </section>
            <section className="w-5/6 mt-3 flex justify-center items-center gap-5">
                <ConfirmationModal id={id}/>
                <Link href={`/athlete/${id}/edit`} className="bg-[#2B80FF] px-2 py-1 rounded-md cursor-pointer transition-colors duration-200 hover:bg-[#1d48ad]"
                    
                >Editar
                </Link>
            </section>
        </>
    )
}
