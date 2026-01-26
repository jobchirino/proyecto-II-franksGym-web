import { validateAthlete } from "@/schemas/athlete";
import { createCustomError } from "@/utils/customErros";
import { revalidatePath } from "next/cache";
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

export async function GET(request,  {params }){
    const { id } = await params;
    try {
        const athlete = await prisma.athlete.findUnique({
            where: {id: Number(id)},
        });
        if (!athlete) return NextResponse.json({error: "Atleta no encontrado"}, {status: 404});
        return NextResponse.json(athlete, {status: 200});
    } catch (error) {
        console.log('aquí el error al obtener atleta: ', error)
        return NextResponse.json({error: "Error al obtener el atleta"}, {status: 500});
    }
}

export async function DELETE(request, { params }){
    const { id } = await params;
    try {
        const athlete = await prisma.athlete.findUnique({
            where: {id: Number(id)},
        });
        if (!athlete) return NextResponse.json({error: "Atleta no encontrado"}, {status: 404});
        await prisma.athlete.delete({
            where: {id: Number(id)},
        });
        return NextResponse.json({message: "Atleta eliminado con éxito"}, {status: 200});
        
    } catch (error) {
        return NextResponse.json({error: "Error al eliminar el atleta"}, {status: 500});
    }
}

export async function PUT(request, { params }){
    const { id } = await params;
    const athlete = await prisma.athlete.findUnique({
        where: {id: Number(id)},
    });
    if (!athlete) return NextResponse.json({error: "Atleta no encontrado"}, {status: 404});

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
    console.log('aquí los datos recibidos en el put: ', datos)
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
    
    if (CIExists && CIExists.id != id) return NextResponse.json({error: "Ya existe un atleta con la CI proporcionada"}, {status: 409})
    if (emailExist && emailExist.id != id) return NextResponse.json({error: "Ya existe un atleta con el correo proporcionado"}, {status: 409})
    
    try {
        await prisma.athlete.update({
            where: {id: Number(id)},
            data: {
                ...result.data
            }
        })
        revalidatePath(`/athlete/${id}`);
        return NextResponse.json({message: "Atleta actualizado con éxito"}, {status: 200})
    } catch (error) {
        console.log('aquí el error al actualizar atleta: ', error)
        return NextResponse.json({error: "Error al actualizar el atleta"}, {status: 500})
    }

}