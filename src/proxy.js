import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server"

export { default } from "next-auth/middleware"

export async function proxy(req){
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const pathname = req.nextUrl.pathname
    const isApiRoute = req.nextUrl.pathname.startsWith('/api/')
    const authRoutes = ['/api/users/signIn', '/api/users/is-first', '/api/users/forgot-password', '/api/users/forgot-password/reset-password', '/api/athletes/monthly', '/api/athletes/especific-updates']

    if (!token && !authRoutes.includes(pathname)) {
        if(isApiRoute){
            console.log('sin token: ',pathname )
            return NextResponse.json({error: 'No autorizado'}, { status: 401 })
        }
        return NextResponse.redirect(new URL('/auth', req.url));
    }
    console.log('con token')

    if (pathname.startsWith('/manage')) {
        const isFirst = token.isFirst === true
        if (!isFirst) {
            return new NextResponse(null, { status: 404 });
        }
    }
}

export const config = {
    matcher: [
        '/', '/athlete/:path*', '/newAthlete', '/profile/:path*', '/manage/:path*', 
        '/api/athletes', '/api/athletes/:id','/api/users'
    ]
}