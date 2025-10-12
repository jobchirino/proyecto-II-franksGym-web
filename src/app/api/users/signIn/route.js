import { prisma } from "@/app/libs/prisma"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

export async function POST(request){
    try {  
        const datos = await request.json()
        const user = await prisma.user.findUnique({
            where: {
                email: datos.email
            }
        })
        if(!user) return NextResponse.json({error: 'Este usuario no existe'}, {status: 404})
    
        const isPasswordCorrect = await bcrypt.compare(datos.password, user.password)
        if(!isPasswordCorrect) return NextResponse.json({error: 'Contraseña incorrecta'}, {status: 401})
    
        return NextResponse.json({message: 'Inicio de sesión exitoso'}, {status: 200})
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: 'Error desconocido'}, {status: 500})
    }
}