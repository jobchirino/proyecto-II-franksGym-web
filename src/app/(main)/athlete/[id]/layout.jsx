import { prisma } from "@/app/libs/prisma"
import { ButtonBack } from "@/components/buttonBack"

export async function getAthlete(id) {
    try {
        console.log('aquí el fetch: ', `${process.env.NEXT_PUBLIC_API_URL}/api/athlete/${id}`)
        // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/athletes/${id}`, 
        //     {cache: 'force-cache', next: { tags: [`athlete:${id}`] }}
        // )
        const athlete = await prisma.athlete.findUnique({
            where: { id: parseInt(id) },
        })
        // const athlete = await res.json()
        //
        if (!athlete) throw Error("Atleta no encontrado")
        console.log('aquí el atleta: ', athlete)
        return athlete
    } catch (error) {
        console.log('aquí el error del fetch server: ', error)
        throw error
    }
}
export default async function DetailLayout({ children, params }) {
    // const id = await params.id
    // const athlete = await getAthlete(id) 
    return (
        <>
            <ButtonBack />
            {children}
        </>
    )
}
