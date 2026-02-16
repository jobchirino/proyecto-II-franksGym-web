import ClientsTable from "@/components/clientsTable"
import ModalError from "@/components/modalError"

import Pagination from "@/components/Pagination"
import SearchAthleteForm from "@/components/SearchAthleteForm"
import { fetchAthletesPages, fetchAthletesPerPage } from "@/lib/data"
import { Suspense } from "react"


export default async function Athletes({ searchParams }) {
    const params = await searchParams
    const searchQuery = params.search || ""
    const currentPage = Number(params.page) || 1
    const { error, totalPages } = await fetchAthletesPages({ searchQuery })

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
