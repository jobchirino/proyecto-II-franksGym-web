'use client'
import Loader from "@/components/loader";

export default function Loading(){
    return(
        <div className="absolute top-0 left-0 w-full h-dvh flex justify-center items-center bg-[#1B1C1F]">
            <Loader />
        </div>
    )
}