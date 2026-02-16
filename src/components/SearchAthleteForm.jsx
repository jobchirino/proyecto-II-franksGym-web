"use client";

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchAthleteForm() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams)
        params.set("page", "1")
        term ? params.set("search", term) : params.delete("search")

        replace(`${pathname}?${params.toString()}`)
    }, 500)

    return (
        <div className="self-start ml-8 desktop:ml-0 pt-4 desktop:pt-0 relative desktop:absolute desktop:top-2 desktop:left-[22%]">
            <form onSubmit={(e) => e.preventDefault()}>
                <button aria-label="Buscar atleta" className="cursor-pointer">
                    <FaSearch className="absolute top-6 desktop:top-2 left-2" />
                </button>
                <input
                    onChange={(e) => handleSearch(e.target.value)}
                    aria-label="Cuadro de búsqueda"
                    type="search"
                    placeholder="Buscar"
                    id="search"
                    className="bg-[#72727273] rounded-xl pl-7 h-8 outline-none"
                    required
                    defaultValue={searchParams.get("search")?.toString()}

                />
            </form>
        </div>
    );
}
