'use client'
import ClientsTable from "@/components/clientsTable"
import Loader from "@/components/loader"
import axios from "axios"
import { useEffect, useState } from "react"
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { useFetchSearch } from "./logic"
import ModalError from "@/components/modalError"


export default function Athletes(){
    const [athlete, setAthletes] = useState('')
    const [loading, setLoading]  = useState(true)
    const [page, setPage]        = useState(1)
    const [hasMore, setHasMore]  = useState(true)
    const [error, setError]      = useState('') 
    useEffect(() => {
        setLoading(true)
        axios.get(`/api/athletes?page=${page}`)
        .then((response) => {
           setAthletes({athletes: response.data.athletes, iSearch: false})
           setHasMore(response.data.hasMore)
        })
        .catch((error) => {
            console.log(error)
        }).finally(() => setLoading(false))
    }, [page])

    const { handleLogicSearch } = useFetchSearch(setAthletes, setError, setLoading)
    const handleSearch = (e) => {
        handleLogicSearch(e)
    }
    
    return(
        <>
        {
            loading? 
                <div className="flex flex-grow justify-center items-center">
                    <Loader />
                </div> :
                <>
                    <div className="self-start ml-8 desktop:ml-0 pt-4 desktop:pt-0 relative desktop:absolute desktop:top-2 desktop:left-[22%]">
                        <form onSubmit={handleSearch}>
                            <button className="cursor-pointer">
                                <FaSearch className="absolute top-6 desktop:top-2 left-2"/>
                            </button>
                            <input 
                                type="search" 
                                placeholder="Buscar"
                                id="search"
                                className="bg-[#72727273] rounded-xl pl-7 h-8 outline-none"

                            />
                        </form>
                    </div>
                    <ClientsTable data={athlete.athletes} />
                    <section className="flex grow-1 items-end justify-center relative">
                        <div className={`flex items-center gap-3 ${athlete.iSearch? 'invisible' : ''}`}>

                            <button className={`cursor-pointer ${page === 1? 'invisible' : ''}`} onClick={() => setPage(page - 1)}><MdKeyboardDoubleArrowLeft color="#D80948" size={50}/></button>
                            <p className="text-3xl">{page}</p>
                            <button className={`cursor-pointer ${hasMore? '' : 'invisible'}`} onClick={() => setPage(page + 1)}><MdKeyboardDoubleArrowRight color="#D80948" size={50}/></button>

                        </div>
                    </section>
                </>
        }
        <ModalError error={error} />
        </>
    )
}