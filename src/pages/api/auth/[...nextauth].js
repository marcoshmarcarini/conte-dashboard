import NextAuth from "next-auth/next";
import CredentialsProvider  from "next-auth/providers/credentials";
 
export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'NextAuthCredentials',
            credentials: {
                
            },
            async authorize(credentials, req){
                const res = await fetch("http://localhost:3000/api/users", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                  })
                  const user = await res.json()
            
                  // If no error and we have user data, return it
                  if (res.ok && user) {
                    return user
                  }
                  // Return null if user data could not be retrieved
                  return null
            }
        })
    ],
    secret: process.env.SECRET,
    callbacks: {
        jwt: async ({ token, user}) => {
            if(user){
                token.id = user.id
            }
            return token
        },
        session: ({session, token}) => {
            if(token) {
                session.id = token.id
            }
            return session
        }
    },
    jwt: {
        secret: process.env.SECRET,
        encryption: true,
    }
}

export default NextAuth(authOptions)