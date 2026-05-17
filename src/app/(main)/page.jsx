import ClientsTable from "@/components/clientsTable";
// import axios from "axios";
import { prisma } from "../libs/prisma";
import Link from "next/link";
import { DashboardCard } from "@/components/card";
import { BsChevronUp, BsExclamation, BsPeople } from "react-icons/bs";
import { FaDollarSign } from "react-icons/fa6";

export const dynamic = 'force-dynamic';

export default async function Home() {
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
    const atlhetesLength = await prisma.athlete.count()
    const athletesPaid = await prisma.athlete.count({
        where: {
            isPaid: true
        }
    })

    const athletesPending = await prisma.athlete.count({
        where: {
            isPaid: false
        }
    })

    console.log('aquí los atletas: ', athletes)
    return (
        <>
            <div className="flex justify-center items-center gap-x-8 gap-y-4 flex-wrap p-4">
                <DashboardCard text="Nº de Atletas" data={atlhetesLength} icon={<BsPeople size={24}/>} />
                <DashboardCard text="Nº Pagos" data={athletesPaid} icon={<FaDollarSign size={24}/>} />
                <DashboardCard text="Nº Pendientes" data={athletesPending} icon={<BsExclamation size={24}/>} />
            </div>
            <ClientsTable data={athletes} />
            {
                athletes.length > 0 ? '' :
                    <div className="w-5/6 flex justify-center items-center flex-col desktop:items-end">
                        <Link href="/newAthlete" className="bg-[#C23D3D] px-3 py-2 mt-3 cursor-pointer rounded-lg transition-colors duration-300 hover:bg-[#842E2E]">
                            Registra tu Primer Atleta
                        </Link>
                    </div>
            }
        </>

    )
}
