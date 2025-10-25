import { prisma } from "@/app/libs/prisma"
import { validateUser } from "@/schemas/users"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { createCustomError } from "@/utils/customErros"

export async function POST(request){
    try {
        const formData = await request.formData()
        const datos = {
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
            isFirst: formData.get('isFirst') === 'true' ? true : false,
            name: formData.get('name')
        }
    
        const result = validateUser(datos)
        if(!result.success) {
            console.log(result.error)
            const customError = createCustomError(JSON.parse(result.error))
            return NextResponse.json({error: customError}, {status: 400})
        }
        
        const testUserExist = await prisma.user.findUnique({
            where: {
                email: result.data.email
            }
        })
        if(testUserExist) return NextResponse.json({error: 'El correo ya está en uso'}, {status: 400})
    
        if(result.data.password !== result.data.confirmPassword) return NextResponse.json({error: 'Las contraseñas no coinciden'}, {status: 400})
        const hashedPassword = await bcrypt.hash(result.data.password, 10)
        const newUser = await prisma.user.create({
            data: {
                email: result.data.email,
                password: hashedPassword,
                isFirst: result.data.isFirst,
                name: result.data.name
            }
        })
    
        if(!newUser) return NextResponse.json({error: 'Error al crear el usuario'}, {status: 500})
        
        return NextResponse.json({
            message: 'Usuario creado correctamente',
            user: {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name
            }
        }, {status: 201})

    } catch (error) {
        console.log(error)
        return NextResponse.json({error: 'Error desconocido'}, {status: 500})
    }
}