import { prisma } from "@/app/libs/prisma";
import { NextResponse } from "next/server";

export default async function POST( request ) {
    const haceUnaSemana = new Date();
    haceUnaSemana.setDate(haceUnaSemana.getDate() - 7);

    const haceUnDia = new Date()
    haceUnDia.setDate(haceUnDia.getDate() - 1)
    try {
        await prisma.athlete.updateMany({
            where: {
                isPaid: true,
                membershipType: 'semanal',
                lastPaymentDate: {
                    lte: haceUnaSemana
                }
            },
            
            data: {
                isPaid: false

            }
        });

        await prisma.athlete.updateMany({
            where: {
                isPaid: true,
                membershipType: 'por_dia',
                lastPaymentDate: {
                    lte: haceUnDia
                }
            },
            
            data: {
                isPaid: false
            }
        })

        return NextResponse.json({ message: 'Reseteo semanal exitoso', resultado }, { status: 200 });
    } catch (error) {
        console.error('Error al resetear la membresía:', error);
        return NextResponse.json({ message: 'Error al resetear la membresía semanal' }, { status: 500 });
    }
}