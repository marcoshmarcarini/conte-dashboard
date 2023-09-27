// pages/api/sendEmail.js
import nodemailer from 'nodemailer';

export default async (req, res) => {
  if(req.method != 'POST'){
    return res.status(405).end()
  }

  const {email, campanha, body} = req.body

  // Configurar o transporte de e-mail
  const transporter = nodemailer.createTransport({
    // Configurações do seu servidor de e-mail
    host: 'email-ssl.com.br',
    port: 465,
    secure: true,
    auth:{
        user: 'junior@comconteudo.com.br',
        pass: 'Conteudo@90'
    }
  });

  // Configurar a mensagem de e-mail
  const mailOptions = {
    // Detalhes do e-mail
    from: 'junior@comconteudo.com.br',
    to: email,
    subject: campanha,
    html: body
  };

  // Enviar o e-mail
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'E-mail enviado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao enviar o e-mail' });
  }
};


/* 

const transporter = nodemailer.createTransport({
                host: 'email-ssl.com.br',
                port: 465,
                secure: true,
                auth: {
                    user: 'junior@comconteudo.com.br',
                    pass: 'Conteudo@90'
                }
            })


            const mailOptions = {
                // Detalhes do e-mail
                from: 'junior@comconteudo.com.br',
                to: novaNota.emailValido,
                subject: 'Solicitação Enviada',
                text: 'Solicitação Enviada com sucesso!',
                html: `
                <ul>
                    <li>Nome da Campanha: ${novaNota.campanha}</li>
                    <li>Tipo de Material ou Mídia: ${novaNota.tipo}</li>
                    <li>Número PP ou PI: ${novaNota.pppi}</li>
                    <li>Valor da Nota: R$ ${novaNota.valor}</li>
                    <li>Número da NotaFiscal: ${novaNota.notafiscal}</li>
                    <li>Data de Veiculação: ${novaNota.dataVeiculacao}</li>
                </ul>
                `
            }
            await transporter.sendMail(mailOptions);



*/
