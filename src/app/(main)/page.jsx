import ClientsTable from "@/components/clientsTable";
import axios from "axios";

export default async function Home(){
  // const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/athletes?page=1`)
  const athletes = await prisma.athlete.findMany({
    // skip: skip,
    take: 5,
    orderBy: { createdAt: "desc" },
    select: {
        id: true,
        fullName: true,
        CI: true,
        isPaid: true
    }
  })
  console.log('aquí los atletas: ', athletes)
  return(
    <>
        <ClientsTable data={athletes} />
        {
          athletes.length > 0? '':
          <div className="w-5/6 flex justify-center items-center flex-col desktop:items-end">
            <button className="bg-[#C23D3D] px-3 py-2 mt-3 cursor-pointer rounded-lg transition-colors duration-300 hover:bg-[#842E2E]">
              Registra tu Primer Atleta
            </button>
          </div>
        }
    </>
    
  )
}
