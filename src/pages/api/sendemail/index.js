// pages/api/sendEmail.js
import nodemailer from 'nodemailer';

export default async (req, res) => {
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
    to: 'thais@comconteudo.com.br',
    subject: 'Cadastro',
    text: 'cadastro criado com sucesso!'
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