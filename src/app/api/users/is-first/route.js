import { prisma } from "@/app/libs/prisma"
import { NextResponse } from "next/server"

export async function GET(){
    try {
        const userIsFirst = await prisma.user.findMany({
            where: {
                isFirst: true
            }
        })
        console.log('userIsFirst', userIsFirst)
        if (userIsFirst.length > 0) return NextResponse.json({ isFirst: false }, { status: 200 })
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({ isFirst: false }, { status: 500 })
    }

    return NextResponse.json({ isFirst: true }, { status: 200 })
}