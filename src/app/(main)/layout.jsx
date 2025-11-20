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
            <div className="w-full h-dvh flex relative">
                <Nav showNav={showNav} setNav={setShowNav} />
                <div className="grow-1 flex flex-col relative desktop:static">
                    <Header setNav={setShowNav} />
                    <main className="flex-grow flex flex-col items-center pb-4 overflow-y-auto desktop:relative">

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
            </div>
        </SessionProviderComponent>
    )
}
