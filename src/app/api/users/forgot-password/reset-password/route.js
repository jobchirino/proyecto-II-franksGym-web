import { prisma } from "@/app/libs/prisma"
import { validateResetPassword } from "@/schemas/reset-password"
import { createCustomError } from "@/utils/customErros"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

const fieldMap = {
    password: 'Contraseña',
    confirmPassword: 'Confirmar contraseña',
    token: 'Token'
}

export async function POST(request){
    const formData = await request.formData()
    const data = {
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
        token: formData.get('token')
    }

    const result = validateResetPassword(data)
    if(!result.success){
        const customErrors = createCustomError(JSON.parse(result.error), fieldMap)
        return NextResponse.json({error: customErrors}, {status: 400})
    }

    if(result.data.password !== result.data.confirmPassword) return NextResponse.json({error: 'Las contraseñas no coinciden'}, {status: 400})

    const usersWithToken = await prisma.user.findMany({
        where: {
            forgotPasswordToken: { not: null }
        }
    })

    let userFound = null

    for(const user of usersWithToken){
        const isMatch = await bcrypt.compare(result.data.token, user.forgotPasswordToken)
        if(isMatch){
            userFound = user
            break
        }
    }

    if(!userFound) return NextResponse.json({error: 'Token inválido o expirado'}, {status: 400})
    if(userFound.forgotPasswordExpire < new Date()) return NextResponse.json({error: 'Token inválido o expirado'}, {status: 400})

    const hashedPassword = await bcrypt.hash(result.data.password, 10)

    await prisma.user.update({
        where: { id: userFound.id },
        data: {
            password: hashedPassword,
            forgotPasswordToken: null,
            forgotPasswordExpire: null
        }
    })

    return NextResponse.json({message: 'Contraseña restablecida con éxito'}, {status: 200})
}