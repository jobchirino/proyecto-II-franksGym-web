export { default } from "next-auth/middleware"

export const config = {
    matcher: ['/', '/athlete/:path*', '/newAthlete', '/profile']
}