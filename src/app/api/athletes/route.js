import { prisma } from "@/app/libs/prisma";
import { validateAthlete } from "@/schemas/athlete";
import { createCustomError } from "@/utils/customErros";
import { NextResponse } from "next/server";

const fieldMap = {
    CI: 'Cédula de Identidad',
    fullName: 'Nombre Completo',
    addres: 'Dirección',
    phoneNumber: 'Número de Teléfono',
    emergencyPhoneNumber: 'Número de Teléfono de Emergencias',
    email: 'Correo Electrónico',
    isPaid: 'Estado de Pago',
    membershipType: 'Tipo de Membresía'
}

export async function GET(req){
    const { searchParams } = new URL(req.url);

    const searchQuery = searchParams.get('search') || ''
    if(searchQuery){
        const parseQuery = isNaN(Number(searchQuery)) ? null : Number(searchQuery);
        if(!parseQuery) return NextResponse.json({error: "Cédula de Identidad inválida"}, {status: 400});
        try {
            const athlete = await prisma.athlete.findUnique({
                where: {
                    CI: Number(searchQuery)
                },
            })
            if(!athlete) return NextResponse.json({error: "Atleta no encontrado"}, {status: 404});
            return NextResponse.json(athlete, {status: 200});   
        } catch (error) {
            console.log(error.message)
            return NextResponse.json({error: "Error desconocido"}, {status: 500});
        }
    }

    const page = parseInt(searchParams.get('page')) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;
    try {
        const athletes = await prisma.athlete.findMany({
            skip: skip,
            take: limit,
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                fullName: true,
                CI: true,
                isPaid: true
            }
        })
    
        const lastAthlete = await prisma.athlete.findFirst({
            orderBy: { createdAt: "asc" },
            select: {
                id: true
            }
        })
        console.log('aquí el last athlete: ', lastAthlete)
        const hasMore = athletes.find(athlete => athlete.id === lastAthlete.id) ? false : true;
        console.log('aquí el hasMore: ', hasMore)
    
    
        return NextResponse.json({athletes, hasMore}, {status: 200});    
    } catch (error) {
        return NextResponse.json({error: "Error al obtener los atletas"}, {status: 500});
    }
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
        const customErrors = createCustomError(JSON.parse(result.error), fieldMap);
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