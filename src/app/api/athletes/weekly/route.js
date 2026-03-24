import { prisma } from "@/app/libs/prisma";
import { NextResponse } from "next/server";
import { is } from "zod/v4/locales";

export default async function POST( request ) {
    try {
        const haceUnaSemana = new Date();
        haceUnaSemana.setDate(haceUnaSemana.getDate() - 7);
        
        const resultado = await prisma.atleta.updateMany({
            where: {
                isPaid: true,
                membershipType: 'semanal',
                lt
            },
            
            data: {
                isPaid: false,
                // ultimoPago: new Date(), // Si solo quieres marcar el nuevo ciclo
            }
        });

        return NextResponse.json({ message: 'Reseteo semanal exitoso', resultado }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error al resetear la membresía semanal' }, { status: 500 });
    }
}