import { prisma } from "@/app/libs/prisma";
import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";
import { NextResponse } from "next/server";

export const POST = verifySignatureAppRouter(async (req) => {
    try {
        const result = await prisma.athlete.updateMany({
            where: {
                isPaid: true,
                membershipType: 'mensual'
            },
            data: {
                isPaid: false
            }
        })

        return NextResponse.json({ message: 'Reseteo exitoso'}, { status: 200 })
    }catch(error){
        console.log('error en el reseteo: ', error)
        return NextResponse.json({ message: 'Error en el reseteo' , error: error}, { status: 500 })
    }
})