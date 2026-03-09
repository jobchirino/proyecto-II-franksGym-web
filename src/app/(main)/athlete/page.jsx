'use client'
import ClientsTable from "@/components/clientsTable"
import Loader from "@/components/loader"
import axios from "axios"
import { useEffect, useState } from "react"
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { useFetchSearch } from "./logic"
import ModalError from "@/components/modalError"
import { useDebouncedCallback } from "use-debounce"


export default function Athletes() {
    const [athlete, setAthletes] = useState('')
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [error, setError] = useState('')
    const [search, setSearch] = useState('')

    useEffect(() => {
        setLoading(true)
        axios.get(`/api/athletes?page=${page}`)
            .then((response) => {
                console.log('aquí el response', response.data)
                setAthletes({ athletes: response.data.athletes, iSearch: false, hasMore: response.data.hasMore })
            })
            .catch((error) => {
                console.log(error)
            }).finally(() => setLoading(false))
    }, [page])

    const { handleLogicSearch } = useFetchSearch(setAthletes, setError, setLoading)
    const handleSearch = useDebouncedCallback(() => {
        handleLogicSearch(search)
    }, 700)

    return (
        <>
            {
                loading ?
                    <div className="flex flex-grow justify-center items-center">
                        <Loader />
                    </div> :
                    <>
                        <div className="self-start ml-8 desktop:ml-0 pt-4 desktop:pt-0 relative desktop:absolute desktop:top-2 desktop:left-[22%]">
                            <form onSubmit={(e) => e.preventDefault()}>
                                <button aria-label="Buscar atleta" className="cursor-pointer">
                                    <FaSearch className="absolute top-6 desktop:top-2 left-2" />
                                </button>
                                <input
                                    onChange={(e) => {
                                        setSearch(e.target.value)
                                        handleSearch()
                                    }}
                                    aria-label="Cuadro de búsqueda"
                                    type="search"
                                    placeholder="Buscar"
                                    id="search"
                                    className="bg-[#72727273] rounded-xl pl-7 h-8 outline-none"
                                    value={search || ''}
                                />
                            </form>
                        </div>
                        <ClientsTable data={athlete.athletes} functional={true} />
                        <section className="flex grow-1 items-end justify-center relative">
                            <div className={`flex items-center gap-3 ${athlete.iSearch ? 'invisible' : ''}`}>

                                <button className={`cursor-pointer ${page === 1 ? 'invisible' : ''}`} aria-label="Página anterior" onClick={() => setPage(page - 1)}><MdKeyboardDoubleArrowLeft color="#D80948" size={50} /></button>
                                <p className="text-3xl" aria-label={`Número de página ${page}`}>{page}</p>
                                <button className={`cursor-pointer ${athlete.hasMore ? '' : 'invisible'}`} aria-label="Siguiente página" onClick={() => setPage(page + 1)}><MdKeyboardDoubleArrowRight color="#D80948" size={50} /></button>

                            </div>
                        </section>
                    </>
            }
            <ModalError error={error} />
        </>
    )
}
