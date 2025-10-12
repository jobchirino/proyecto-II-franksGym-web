'use client'
import { SessionProvider } from "next-auth/react"
export default function SessionProviderComponent({children}){
    return(
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}