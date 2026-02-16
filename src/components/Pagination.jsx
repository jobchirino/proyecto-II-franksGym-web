"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

export default function Pagination({ totalPages }) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const currentPage = Number(searchParams.get("page")) || 1

    const createPageURL = (pageNumber) => {
        const params = new URLSearchParams(searchParams)
        params.set("page", pageNumber.toString())
        return `${pathname}?${params.toString()}`
    }

    return (
        <section className="flex grow items-end justify-center relative">
            <div className="flex items-center gap-3">

                <PaginationArrow direction="left" href={createPageURL(currentPage - 1)} isDisabled={currentPage <= 1} />
                <p className="text-3xl" aria-label={`Número de página ${currentPage}`}>{currentPage}</p>
                <PaginationArrow direction="right" href={createPageURL(currentPage + 1)} isDisabled={currentPage >= totalPages} />
            </div>
        </section>
    )
}

function PaginationArrow({ href, direction, isDisabled }) {
    const icon = direction === "left" ? <MdKeyboardDoubleArrowLeft color="#D80948" size={50} /> : <MdKeyboardDoubleArrowRight color="#D80948" size={50} />

    return isDisabled ? <div className="invisible">{icon}</div> : <Link className="cursor-pointer" href={href}>{icon}</Link>
}
