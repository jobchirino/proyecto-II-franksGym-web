'use client'
import { useSession } from "next-auth/react"
import { IoPersonOutline } from "react-icons/io5";
import { BsPersonCircle } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import Link from "next/link";
import Loader from "@/components/loader";


export default function Profile(){
    const { data: session} = useSession()
    console.log('aquí los datos del usuario:', session)
    return(
        <>
        {
        session?
        <div className="w-5/6 bg-[#323032] rounded-lg mt-3 py-3 px-4 flex flex-col gap-3">
            <section className="w-full flex gap-3 items-center">
                <div className="p-4 rounded-full bg-[#4C4C4C]">
                    <IoPersonOutline color="#C23D3D" size={50}/>
                </div>
                <div>
                    <h3 className="text-3xl font-semibold">{session?.user.name}</h3>
                    <p>Gestiona tu cuenta</p>
                </div>
            </section>
            <section className="w-full flex flex-col gap-3 items-center">
                <p className="self-start">Datos del perfil</p>
                <div className="w-full flex flex-col gap-3 pl-4">
                    <div className="flex gap-2 items-center">
                        <BsPersonCircle color="white" size={30}/>
                        <p>{session?.user.name}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <MdEmail color="white" size={30}/>
                        <p>{session?.user.email}</p>
                    </div>
                </div>
                <div className="self-end">
                    <Link href={`#`} className="bg-[#2B80FF] px-2 py-1 rounded-md cursor-pointer transition-colors duration-200 hover:bg-[#1d48ad]">
                        Editar
                    </Link>
                </div>
            </section>
        </div> :

        <div className="w-full h-full flex justify-center items-center">
            <Loader />
        </div>

        }
        </>
    )
}