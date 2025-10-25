'use client'
import Header from "@/components/header";
import Nav from "@/components/nav";
import SessionProviderComponent from "@/components/sessionProvider";
import { useState } from "react";
import { Roboto_Mono } from "next/font/google";

export const roboto = Roboto_Mono({
  subsets: ["latin"],
  weight: '400'
});

export default function MainLayout({children}){
    const [showNav, setShowNav] = useState()
    return(
        <SessionProviderComponent>
            <div className="w-full h-dvh flex relative">
                <Nav showNav={showNav} setNav={setShowNav} />
                <div className="grow-1 flex flex-col">
                    <Header setNav={setShowNav} />
                    {children}
                </div>
            </div>
        </SessionProviderComponent>
    )
}
