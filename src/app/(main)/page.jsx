import ClientsTable from "@/components/clientsTable";
// import axios from "axios";
import { prisma } from "../libs/prisma";
import Link from "next/link";
import { DashboardCard } from "@/components/card";
import { BsExclamation, BsPeople } from "react-icons/bs";
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
    const paymentRate = atlhetesLength ? Math.round((athletesPaid / atlhetesLength) * 100) : 0

    console.log('aquí los atletas: ', athletes)
    return (
        <>
            <section className="w-5/6 mt-4 rounded-2xl border border-[#4C4C4C] bg-gradient-to-br from-[#323032] to-[#262528] p-4 shadow-xl">
                <div className="flex flex-col gap-4 desktop:flex-row desktop:items-end desktop:justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-[#E50914]">Resumen General</p>
                        <h3 className="mt-2 text-2xl font-semibold">Estado actual de las membresías</h3>
                        <p className="mt-1 text-sm text-[#D0D0D0]">{athletesPaid} atletas al día y {athletesPending} con pagos pendientes.</p>
                    </div>
                    <div className="self-start rounded-2xl border border-[#4C4C4C] bg-[#1B1C1F] px-4 py-3 text-center shadow-lg shadow-black/20">
                        <p className="text-xs uppercase tracking-[0.2em] text-[#D0D0D0]">Cobertura</p>
                        <p className="text-3xl font-bold text-[#E50914]">{paymentRate}%</p>
                    </div>
                </div>
                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    <DashboardCard text="Nº de Atletas" data={atlhetesLength} icon={<BsPeople size={24}/>} />
                    <DashboardCard text="Nº Pagos" data={athletesPaid} icon={<FaDollarSign size={24}/>} />
                    <DashboardCard text="Nº Pendientes" data={athletesPending} icon={<BsExclamation size={24}/>} />
                </div>
            </section>
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
