import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { ContactFormData } from '@/@types';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

async function sendClientEmail(data: ContactFormData) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: data.email,
    subject: 'Recebemos sua solicitação - Atualização OLT',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Olá ${data.nome},</h2>
        <p>Obrigado por entrar em contato conosco!</p>
        <p>Recebemos sua solicitação para atualização de OLT e em breve entraremos em contato.</p>
        <p>Detalhes da sua solicitação:</p>
        <ul>
          <li>Empresa: ${data.empresa}</li>
          <li>Quantidade de OLTs: ${data.olt_quantia}</li>
        </ul>
        <p>Atenciosamente,<br>Equipe de Suporte</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
}

async function sendAdminNotification(data: ContactFormData) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'ismaelstrey@gmail.com',
    subject: 'Nova Solicitação de Atualização OLT',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Nova Solicitação de Atualização</h2>
        <p>Detalhes do cliente:</p>
        <ul>
          <li>Nome: ${data.nome}</li>
          <li>Empresa: ${data.empresa}</li>
          <li>Email: ${data.email}</li>
          <li>WhatsApp: ${data.whatsapp}</li>
          <li>Quantidade de OLTs: ${data.olt_quantia}</li>
        </ul>
        <h3>Descrição:</h3>
        <p>${data.descricao}</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
}

export async function POST(request: Request) {
  try {
    const data: ContactFormData = await request.json();
    
    await Promise.all([
      sendClientEmail(data),
      sendAdminNotification(data)
    ]);

    return NextResponse.json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending emails:', error);
    return NextResponse.json(
      { error: 'Failed to send emails' },
      { status: 500 }
    );
  }
}