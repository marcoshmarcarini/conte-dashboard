import { getServerSession } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth]"

export default async (req, res) => {
    const session = await getServerSession(req, res, authOptions)
    if(session){
        res.send({
            content:
            "Este é um conteúdo protegido. Você está acessando a partir de uma autenticação."
        })
    }else{
        res.send({
            error: "Você deve criar uma conta para acessar o conteúdo."
        })
    }
}


