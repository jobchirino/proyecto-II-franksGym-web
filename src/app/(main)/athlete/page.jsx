import ClientsTable from "@/components/clientsTable"
// import { FaSearch } from "react-icons/fa";
import ModalError from "@/components/modalError"
// import Loader from "@/components/loader"

import Pagination from "@/components/Pagination"
import SearchAthleteForm from "@/components/SearchAthleteForm"
import { fetchAthletesPages, fetchAthletesPerPage } from "@/lib/data"
import { Suspense } from "react"


export default async function Athletes({ searchParams }) {
    const params = await searchParams
    const searchQuery = params.search || ""
    const currentPage = Number(params.page) || 1
    const { success, error, totalPages } = await fetchAthletesPages({ searchQuery })

    return (
        <>
            <SearchAthleteForm />
            <Suspense key={searchQuery + currentPage} fallback={<div>Cargando...</div>}>
                <ClientsTable dataPromise={fetchAthletesPerPage({ searchQuery, page: currentPage })} functional={true} />
            </Suspense>
            <Pagination totalPages={totalPages} />
            <ModalError error={error} />
        </>
    )
}
