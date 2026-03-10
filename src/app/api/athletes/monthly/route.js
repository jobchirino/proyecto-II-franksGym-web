import { prisma } from "@/app/libs/prisma";
import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";
import { NextResponse } from "next/server";

export async function POST ( request ) {
    try {
        await prisma.athlete.updateMany({
            where: {
                isPaid: true
            },
            data: {
                isPaid: false
            }
        })

        return NextResponse.json({ message: 'Reseteo exitoso'}, { status: 200 })
    }catch(error){
        return NextResponse.json({ message: 'Error en el reseteo' , error: error}, { status: 500 })
    }
}