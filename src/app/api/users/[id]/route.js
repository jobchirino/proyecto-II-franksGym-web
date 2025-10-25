import { prisma } from "@/app/libs/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request, context){
    const { id } = context.params
    try {
        const athlete = await prisma.athlete.findUnique({
            where: {id: Number(id)},
        });
        if (!athlete) return NextResponse.json({error: "Atleta no encontrado"}, {status: 404});
        await prisma.user.delete({
            where: { id: Number(id) }
        })
        return NextResponse.json({message: "Usuario eliminado con éxito"}, {status: 200});
    } catch (error) {
        return NextResponse.json({error: 'Error al eliminar el usuario'}, {status: 500})
    }
}

// export async function PUT(request, context){
//     const { id } = context.params;
//     const athlete = await prisma.athlete.findUnique({
//         where: {id: Number(id)},
//     });
//     if (!athlete) return NextResponse.json({error: "Atleta no encontrado"}, {status: 404});
// }