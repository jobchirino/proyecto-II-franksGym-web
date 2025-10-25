import { prisma } from "@/app/libs/prisma";
import { validateAthlete } from "@/schemas/athlete";
import { createCustomError } from "@/utils/customErros";
import { NextResponse } from "next/server";
import { is } from "zod/v4/locales";

export async function GET(){
    const athletes = await prisma.athlete.findMany({
        select: {
            id: true,
            fullName: true,
            isPaid: true
        }
    })
    return NextResponse.json(athletes, {status: 200});
}

export async function POST(request){
    const formData = await request.formData();
    const datos = {
        CI: formData.get('CI'),
        fullName: formData.get('fullName'),
        addres: formData.get('addres'),
        phoneNumber: formData.get('phoneNumber'),
        emergencyPhoneNumber: formData.get('emergencyPhoneNumber'),
        email: formData.get('email'),
        isPaid: formData.get('isPaid') === 'true' ? true : false,
        membershipType: formData.get('membershipType')
    }

    const result = validateAthlete(datos)
    if(!result.success){
        const customErrors = createCustomError(JSON.parse(result.error));
        return NextResponse.json({error: customErrors}, {status: 400})
    }
    const CIExists = await prisma.athlete.findUnique({
        where: {
            CI: result.data.CI
        }
    })

    const emailExist = await prisma.athlete.findUnique({
        where: {
            email: result.data.email
        }
    })

    if (CIExists) return NextResponse.json({error: "Ya existe un atleta con la CI proporcionada"}, {status: 409})
    if (emailExist) return NextResponse.json({error: "Ya existe un atleta con el correo proporcionado"}, {status: 409})

    try {
        await prisma.athlete.create({
            data: {
                ...result.data
            }
        })

        return NextResponse.json({message: "Atleta creado con éxito"}, {status: 201})
    } catch (error) {
        console.log('aquí el error al crear atleta: ', error)
        return NextResponse.json({error: "Error al crear el atleta"}, {status: 500})
    }


}