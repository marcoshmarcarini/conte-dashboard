import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider  from "next-auth/providers/credentials"
import { db } from "@/utils/firebase"
import { getDoc, collection, where, query, getDocs } from "firebase/firestore"

async function getUserByEmail(email){
    const usersCollection = collection(db, 'usuarios')
    const q = query(usersCollection, where("email", "==", email))
    const querySnapshot = await getDocs(q)

    if(querySnapshot.size === 0){
        return null
    }

    //Supondo que o email seja exclusivo, então só haverá um usuário no resultado
    const userDoc = querySnapshot.docs[0]
    return userDoc.data()

}


 
export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {label: "E-mail", type: "email", placeholder: "jsmith@test.com"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials, req){
                const user = await getUserByEmail(credentials.email)
                if(user && user.password === credentials.password){
                    return{
                        id: user.id,
                        name: user.username,
                        email: user.email,
                        image: user.fotoPerfil || "/img/default-profile.jpg" // uma imagem padrão
                    }
                }
                return null
                /* if((credentials.email === "marcoshmarcarini@hotmail.com" && credentials.password === "#r4e3w2q1")){
                    return {
                        id: "1",
                        name: "Marcos Henrique",
                        email: "marcoshmarcarini@hotmail.com",
                        image: '/img/profiles/junior.png'
                    }
                    
                } else if((credentials.email === "thais@comconteudo.com.br" && credentials.password === "conteudo@90")){
                    return {
                            id: "2",
                            name: "Thais Souza",
                            email: "thais@comconteudo.com.br",
                            image: "/img/profiles/thais.jpg"
                    }
                    
                } else if((credentials.email === "junior@comconteudo.com.br" && credentials.password === "conteudo@90")){
                    return{
                        id: "3",
                        name: "Junior",
                        email: "junior@comconteudo.com.br",
                        image: '/img/profiles/junior.png'
                    }
                } else if((credentials.email === "gustavo@comconteudo.com.br" && credentials.password === "conteudo@90")){
                    return{
                        id: "4",
                        name: "Gustavo Coelho",
                        email: "gustavo@comconteudo.com.br",
                        image: "/img/profiles.gustavo.jpg"
                    }
                } */
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