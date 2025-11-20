import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server"

export { default } from "next-auth/middleware"

export async function middleware(req){
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const pathname = req.nextUrl.pathname
    console.log('Middleware session: ', token)

    if (!token) {
        return NextResponse.redirect(new URL('/auth', req.url));
    }

    if (pathname.startsWith('/manage')) {
        const isFirst = token.isFirst === true
        if (!isFirst) {
            return new NextResponse(null, { status: 404 });
        }
    }
}

export const config = {
    matcher: ['/', '/athlete/:path*', '/newAthlete', '/profile/:path*', '/manage/:path*']
}