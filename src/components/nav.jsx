'use client'
import { IoPersonOutline, IoPersonAddOutline, IoClose } from "react-icons/io5";
import { FiHome, FiLogOut } from "react-icons/fi";
import { FaDumbbell } from "react-icons/fa";
import { RiGroupLine } from "react-icons/ri";
import { roboto } from "@/app/(main)/layout";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Nav({showNav, setNav}){
    const { data: session } = useSession()
    console.log('aquí los datos del usuario: ', session)
    const handleLogOut = () => {
        signOut()
    }
    
    return(
        <nav className={`absolute h-dvh w-4/6 bg-[#323032] flex flex-col justify-around items-star py-6 transition-all duration-300 z-20 desktop:w-[20%] desktop:relative desktop:nav-show ${showNav? 'nav-show' : 'nav-hidden'}`}>
            <button className="absolute top-3 left-5 cursor-pointer desktop:hidden" onClick={() => setNav(false)}>
                <IoClose size={28} color="white"/>
            </button>
            <button className="self-center p-6 rounded-full bg-[#4C4C4C] cursor-pointer">
                <IoPersonOutline color="#C23D3D" size={65}/>
            </button>
            <ul className={`${roboto.className} flex flex-col gap-6 text-inherit pl-10 cursor-pointer`} onClick={() => setNav(false)}>
                <li>
                    <Link href={'/'} className="flex gap-2 items-center transition-all duration-300 hover:gap-4">
                        <FiHome size={28}/> Inicio
                    </Link>
                </li>
                <li>
                    <Link href={'/athlete'} className="flex gap-2 items-center transition-all duration-300 hover:gap-4">
                        <FaDumbbell size={28}/> Atletas
                    </Link>
                </li>
                <li>
                    <Link href={'/newAthlete'} className="flex gap-2 items-center transition-all duration-300 hover:gap-4">
                        <IoPersonAddOutline size={28}/> Registrar Atleta
                    </Link>
                </li>
                <li>
                    <Link href={'/profile'} className="flex gap-2 items-center transition-all duration-300 hover:gap-4">
                        <IoPersonOutline size={28}/> Perfil
                    </Link>
                </li>
                {
                    session?.user.isFirst ?
                    <li>
                        <Link href={'/manage'} className="flex gap-2 items-center transition-all duration-300 hover:gap-4">
                            <RiGroupLine size={28}/> Gestionar <br /> Usuarios
                        </Link>
                    </li> : ''
                }
            </ul>
            <button className="flex gap-2 items-center pl-10 cursor-pointer transition-all duration-300 hover:gap-4" onClick={handleLogOut}>
                <FiLogOut size={28}/>
                Cerrar Sesión
            </button>
        </nav>
    )
}
//w-[20%] h-full bg-[#323032]  