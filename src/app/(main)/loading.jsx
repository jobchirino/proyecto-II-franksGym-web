'use client'
import Loader from "@/components/loader";

export default function Loading(){
    return(
        <div className="w-full h-dvh flex justify-center items-center">
            <Loader />
        </div>
    )
}