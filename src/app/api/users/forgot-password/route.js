import { prisma } from "@/app/libs/prisma"
import { NextResponse } from "next/server"
import crypto from 'crypto'
import bcrypt from "bcrypt"
import { Resend } from "resend"
import EmailTemplate from "@/components/emailTemplate"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request){
    const formData = await request.formData()
    const email = formData.get('email')
    const user = await prisma.user.findUnique({
        where: { email }
    })
    
    if(!user) return NextResponse.json({
        message: 'Si el correo ingresado está registrado, recibirás un email con las instrucciones para restablecer tu contraseña.'
    }, { status: 200 })
    
    const plainToken = crypto.randomBytes(32).toString('hex')
    const hashedToken = await bcrypt.hash(plainToken, 10)

    const expiredAt = Date.now() + 3600000
    try {
        const { data, error } = await resend.emails.send({
            from: 'FranksGym <noreply@frankgym.com>',
            to: user.email,
            subject: 'Restablecimiento de contraseña',
            react: EmailTemplate({ name: user.name, token: plainToken })
        })

        if(error) {
            console.log('Error al enviar el correo:', error)
            return NextResponse.json({error}, { status: 500 })
        }
        await prisma.user.update({
            where: { email },
            data: {
                forgotPasswordToken: hashedToken,
                forgotPasswordExpire: new Date(expiredAt)
            }
        })

        return NextResponse.json({ message: 'Correo enviado correctamente', data: data }, { status: 200 })
    } catch (error) {
        console.error('Error al solicitar restablecimiento:', error)
        return NextResponse.json({
            message: 'Error al procesar tu solicitud. Por favor, intenta nuevamente más tarde.'
        }, { status: 500 })
    }
}