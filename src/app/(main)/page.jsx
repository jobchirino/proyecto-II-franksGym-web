import ClientsTable from "@/components/clientsTable";
import axios from "axios";

export default async function Home(){
  const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/athletes?page=1`)
  const athlete = await res
  console.log('aquí el atleta: ', athlete)
  return(
    <>
        <ClientsTable data={athlete.data.athletes} />
        {
          athlete.data.athletes.length > 0? '':
          <div className="w-5/6 flex justify-center items-center flex-col desktop:items-end">
            <button className="bg-[#C23D3D] px-3 py-2 mt-3 cursor-pointer rounded-lg transition-colors duration-300 hover:bg-[#842E2E]">
              Registra tu Primer Atleta
            </button>
          </div>
        }
    </>
    
  )
}
