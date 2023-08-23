import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider  from "next-auth/providers/credentials"
 
export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
        {
            id: "google",
            name: "Google",
            type: "oauth",
            wellKnown: "https://accounts.google.com/.well-known/openid-configuration",
            authorization: { params: { scope: "openid email profile" } },
            idToken: true,
            checks: ["pkce", "state"],
            profile(profile) {
              return {
                id: profile.sub,
                name: profile.name,
                email: profile.email,
                image: profile.picture,
              }
            },
          }
    ],
    secret: process.env.SECRET,
    callbacks: {
        async signIn({account, profile}){
            if(account.provider === "google"){
                return profile.email_verified && profile.email.endsWith("@gmail.com")
            }
            return {
                redirect: '/'
            }
        }
    }
    
}

export default NextAuth(authOptions)
