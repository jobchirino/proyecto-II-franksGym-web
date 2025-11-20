'use server'

import { prisma } from "@/app/libs/prisma"
import crypto from "crypto"
import bcrypt from "bcrypt"

export async function resetPassword(formData){
    const email = formData.get('email')

    const user = await prisma.findUnique({
        where: { email }
    })

    if(!user) return {success: true, message: 'Si el correo ingresado está registrado, recibirás un email con las instrucciones para restablecer tu contraseña.'}

    const plainToken = crypto.randomBytes(32).toString('hex')
    const hashedToken = await bcrypt.hash(plainToken, 10)

    const expiredAt = Date.now() + 3600000

    try {
        await prisma.user.update({
            where: { email },
            data: {
                resetPasswordToken: hashedToken,
                resetPasswordExpires: new Date(expiredAt)
            }
        })

        return {success: true, message: 'Si el correo ingresado está registrado, recibirás un email con las instrucciones para restablecer tu contraseña.'}
    } catch (error) {
        console.error('Error al solicitar restablecimiento:', error)
        return {success: false, message: 'Ocurrió un error al procesar tu solicitud. Por favor, intenta nuevamente más tarde.'}
    }
}