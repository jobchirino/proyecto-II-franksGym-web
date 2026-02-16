import ClientsTable from "@/components/clientsTable";
import { fetchAthletesPerPage } from "@/lib/data"


export default async function Home() {
    const { data } = await fetchAthletesPerPage()
    return (
        <>
            <ClientsTable dataPromise={fetchAthletesPerPage()} />
            {
                data.length > 0 ? '' :
                    <div className="w-5/6 flex justify-center items-center flex-col desktop:items-end">
                        <button className="bg-[#C23D3D] px-3 py-2 mt-3 cursor-pointer rounded-lg transition-colors duration-300 hover:bg-[#842E2E]">
                            Registra tu Primer Atleta
                        </button>
                    </div>
            }
        </>

    )
}
