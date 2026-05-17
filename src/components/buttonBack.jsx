"use client"

import { useRouter } from "next/navigation"
import { FaChevronLeft } from "react-icons/fa6"

export const ButtonBack = () => {
    const router = useRouter()
    return (
        <button onClick={() => router.back()} className="flex self-start m-8 cursor-pointer hover:opacity-80">
            <FaChevronLeft size={32} />
        </button>
    )
}
