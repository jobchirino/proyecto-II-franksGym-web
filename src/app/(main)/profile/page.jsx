'use client'
import { useSession } from "next-auth/react"
import Loader from "@/components/loader";
import UserDetailComponent from "@/components/userDetail";


export default function Profile(){
    const { data: session} = useSession()
    console.log('aquí los datos del usuario:', session)
    return(
        <>
        {
        session?
        <UserDetailComponent data={session.user}/> :

        <div className="w-full h-full flex justify-center items-center">
            <Loader />
        </div>

        }
        </>
    )
}