import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                email: {label: 'Email', type: 'text'},
                password: {label: 'Password', type: 'password'}
            },
            async authorize(credentials){
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/signIn`, {
                        method: 'POST',
                        body: JSON.stringify(credentials)
                    })
                    const user = await res.json()
                    if(res.ok && user) return user
                    return null

                } catch (error) {
                    console.log(error)
                    throw new Error('Error desconocido al iniciar sesión')
                }
            }
        })
    ],

    pages: {
        signIn: '/auth',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id; 
                token.isFirst = user.isFirst;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id; 
                session.user.isFirst = token.isFirst;
            }
            return session;
        }
    }
})

export { handler as GET, handler as POST }