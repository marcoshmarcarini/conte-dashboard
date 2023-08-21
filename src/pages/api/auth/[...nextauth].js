import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider  from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'NextAuthCredentials',
            credentials: {},
            async authorize(credentials){
                console.log(credentials)

                return{
                    name: 'Marcos Henrique',
                    email: 'marcoshmarcarini@hotmail.com',
                    password: '123456'
                }
            }
        })
    ],
    secret: process.env.SECRET,
}

export default NextAuth(authOptions)