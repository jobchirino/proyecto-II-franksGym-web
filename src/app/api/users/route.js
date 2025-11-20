import { prisma } from "@/app/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true,
                updatedAt: true
            },
            where: {
                isFirst: false
            }
        });
        return NextResponse.json({users}, {status: 200});
    } catch (error) {
        return NextResponse.json({error: 'Error al obtener los usuarios'}, {status: 500});
    }
}