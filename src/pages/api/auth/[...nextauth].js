import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider  from "next-auth/providers/credentials"
 
export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {label: "E-mail", type: "email", placeholder: "jsmith@test.com"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials, req){
                if(
                    (credentials.email === "marcoshmarcarini@hotmail.com"   && credentials.password === "#r4e3w2q1")      ||
                    (credentials.email === "thais@comconteudo.com.br"       && credentials.password === "conteudo@90")    ||
                    (credentials.email === "junior@comconteudo.com.br"      && credentials.password === "conteudo@90")    ||
                    (credentials.email === "gustavo@comconteudo.com.br"     && credentials.password === "conteudo@90") 
                ){
                    return {
                        id: 1,
                        name: "Marcos Henrique",
                        email: "marcoshmarcarini@hotmail.com"
                    },
                    {
                        id: 2,
                        name: "Thais Souza",
                        email: "thais@comconteudo.com.br",
                        image: "/img/profiles/thais.jpg"
                    },
                    {
                        id: 3,
                        name: "Junior",
                        email: "junior@comconteudo.com.br",
                        image: '/img/profiles/junior.png'
                    },
                    {
                        id:4,
                        name: "Gustavo Coelho",
                        email: "gustavo@comconteudo.com.br",
                        image: "/img/profiles/gustavo.jpg"
                    }
                } else{
                    return null
                }
            }
        }),
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
