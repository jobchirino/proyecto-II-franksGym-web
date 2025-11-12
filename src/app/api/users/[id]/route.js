import { prisma } from "@/app/libs/prisma";
import { validatePartialUser, validateUser } from "@/schemas/users";
import { createCustomError } from "@/utils/customErros";
import { NextResponse } from "next/server";

export async function DELETE(request, context){
    const { id } = context.params;
    try {
        const user = await prisma.user.findUnique({
            where: {id: id},
        });
        if (!user) return NextResponse.json({error: "Usuario no encontrado"}, {status: 404});
        await prisma.user.delete({
            where: { id: id }
        })
        return NextResponse.json({message: "Usuario eliminado con éxito"}, {status: 200});
    } catch (error) {
        if(error.message.includes('Error creating UUID, invalid group length'))
            return NextResponse.json({error: "Usuario no encontrado"}, {status: 404});

        return NextResponse.json({error: 'Error al eliminar el usuario'}, {status: 500})
    }
}

export async function PUT(request, context){
    const { id } = context.params;
    
    try {
        const user = await prisma.user.findUnique({
            where: {id: id},
        });
        // if (!user) return NextResponse.json({error: "Usuario no encontrado"}, {status: 404});
    
        const formData = await request.formData()
        const updateData = {
            email: formData.get('email'),
            name: formData.get('name')
        }
        const validateData = validatePartialUser(updateData);
        if(!validateData.success) {
            const customError = createCustomError(JSON.parse(validateData.error))
            return NextResponse.json({error: customError}, {status: 400});
        }

        const emailTest = await prisma.user.findUnique({
            where: { email: validateData.data.email }
        });

        if(emailTest && emailTest.id !== id) {
            return NextResponse.json({error: "El correo ya está en uso"}, {status: 409});
        }

        const updatedUser = await prisma.user.update({
            where: { id: id },
            data: validateData.data
        });

        const userToReturn = {
            id: updatedUser.id,
            email: updatedUser.email,
            name: updatedUser.name,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt
        }
        return NextResponse.json({message: "Usuario actualizado con éxito", user: userToReturn}, {status: 200});
    } catch (error) {
        console.log('aquí el error: ', error)
        if(error.message.includes('Error creating UUID, invalid group length'))
            return NextResponse.json({error: "Usuario no encontrado"}, {status: 404});

        return NextResponse.json({error: "Error al actualizar el usuario"}, {status: 500});
    }
}