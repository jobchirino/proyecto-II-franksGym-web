'use client'
import { IoPersonOutline, IoPersonAddOutline, IoClose } from "react-icons/io5";
import { FiHome, FiLogOut } from "react-icons/fi";
import { FaDumbbell } from "react-icons/fa";
import { roboto } from "@/app/(main)/layout";
import { signOut } from "next-auth/react";

export default function Nav({showNav, setNav}){
    const handleLogOut = () => {
        signOut()
    }
    
    return(
        <nav className={`absolute h-dvh w-4/6 bg-[#323032] flex flex-col justify-around items-star py-6 transition-all duration-300 z-10 desktop:w-[20%] desktop:relative desktop:nav-show ${showNav? 'nav-show' : 'nav-hidden'}`}>
            <button className="absolute top-3 left-5 cursor-pointer desktop:hidden" onClick={() => setNav(false)}>
                <IoClose size={28} color="white"/>
            </button>
            <button className="self-center p-6 rounded-full bg-[#4C4C4C] cursor-pointer">
                <IoPersonOutline color="#C23D3D" size={65}/>
            </button>
            <ul className={`${roboto.className} flex flex-col gap-6 text-inherit pl-10 cursor-pointer`}>
                <li className="flex gap-2 items-center"><FiHome size={28}/> Inicio</li>
                <li className="flex gap-2 items-center"><FaDumbbell size={28}/> Atletas</li>
                <li className="flex gap-2 items-center"><IoPersonAddOutline size={28}/> Registrar Atleta</li>
                <li className="flex gap-2 items-center"><IoPersonOutline size={28}/> Perfil</li>
            </ul>
            <button className="flex gap-2 items-center pl-10 cursor-pointer" onClick={handleLogOut}>
                <FiLogOut size={28}/>
                Cerrar Sesión
            </button>
        </nav>
    )
}
//w-[20%] h-full bg-[#323032]  