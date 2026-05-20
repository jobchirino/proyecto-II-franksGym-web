'use client'
import Header from "@/components/header";
import Nav from "@/components/nav";
import SessionProviderComponent from "@/components/sessionProvider";
import { useState } from "react";
import { Roboto_Mono } from "next/font/google";
import { usePathname } from "next/navigation";

export const roboto = Roboto_Mono({
  subsets: ["latin"],
  weight: '400',
  style: ['normal', 'italic']
});

export default function MainLayout({children}){
    const [showNav, setShowNav] = useState()
    const pathname = usePathname()
    const licenseUrl = 'https://creativecommons.org/publicdomain/zero/1.0/'
    const titles = {
        "/": 'Inicio',
        "/athlete": "Atletas",
        "/newAthlete": 'Registrar Atleta' ,
        "/profile": "Perfil",
        "/profile/edit":"Editar Perfil",
        "/manage": "Gestionar Usuarios",
        "/manage/newAthlete": "Registrar Nuevo Usuario"
    }
    const regex = /^\/athlete\/\d+$/
    const regexEdit = /^\/athlete\/\d+\/edit$/
    const regexUserDetail = /^\/manage\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
    return(
        <SessionProviderComponent>
            <div className="group w-full h-dvh flex relative">
                <Nav showNav={showNav} setNav={setShowNav} />
                <div className="grow-1 flex flex-col relative desktop:static">
                    <Header setNav={setShowNav} />
                    <main className="scroll-style flex-grow flex flex-col items-center pb-4 overflow-y-auto desktop:relative">

                        <h2 className={`${roboto.className} text-3xl font-semibold self-start pl-10 italic`}>
                            {
                                pathname.match(regex)?
                                "Información del Atleta" :
                                pathname.match(regexEdit)?
                                "Editar Atleta" :
                                pathname.match(regexUserDetail)?
                                "Información del Usuario" :
                                titles[pathname]
                            }
                        </h2>
                        {children}
                    </main>
                </div>
                <a
                    href={licenseUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="pointer-events-none absolute right-3 bottom-3 z-30 rounded-full border border-[#4C4C4C] bg-[#1B1C1F]/90 px-3 py-1.5 text-[11px] text-[#D0D0D0] opacity-0 shadow-lg shadow-black/20 transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100 hover:border-[#C23D3D] hover:text-white"
                >
                    Franks Gym 2026 · CC0 1.0
                </a>
            </div>
        </SessionProviderComponent>
    )
}
