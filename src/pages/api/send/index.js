import sgMail from "@sendgrid/mail"
import sendgridConfig from "../../../../sendgrid.config"

export default async function handler(req, res) {
    if(req.method === "POST"){
        const {destinatario, assunto, corpo} = req.body

        sgMail.setApiKey(sendgridConfig.apiKey)
        
        const msg = {
            to: destinatario,
            from: sendgridConfig.email,
            subject: assunto,
            text: corpo,
        }

        try{
            await sgMail.send(msg)
            res.status(200).json({mensagem: "E-mail enviado com sucesso!"})
        }catch(err){
            console.error("Erro ao enviar e-mail: ", err)
            res.status(500).json({erro: "Erro ao enviar o e-mail"})
        }
    } else {
        res.status(405).end() //Método não permitido
    }
}