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
        if(!user) return NextResponse.json({error: 'Error al iniciar sesión'}, {status: 404})
    
        const isPasswordCorrect = await bcrypt.compare(datos.password, user.password)
        if(!isPasswordCorrect) return NextResponse.json({error: 'Error al iniciar sesión'}, {status: 401})
        const userToReturn = {
            id: user.id,
            email: user.email,
            name: user.name,
            isFirst: user.isFirst
        }
        return NextResponse.json(userToReturn, {status: 200})
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: 'Error desconocido'}, {status: 500})
    }
}