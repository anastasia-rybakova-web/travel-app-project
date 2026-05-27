import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AppService {
   private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.mail.ru', 
      port: 465,
      secure: true, 
      auth: {
        user: 'r.a.v.73.4@mail.ru', 
        pass: 'XXhKvGKnl3rfaakJtgFv',
      },
    } as nodemailer.TransportOptions);
  }

  async sendWelcomeEmail(data: { email: string; username: string; role: string }) {
    const { email, username, role } = data;

    const mailOptions = {
      from: '"Travel App" <r.a.v.73.4@mail.ru>',
      to: email,
      subject: 'Успешная регистрация!',
      html: `
        <h2>Добро пожаловать, ${username}!</h2>
        <p>Вы успешно зарегистрировались на платформе в качестве: <b>${role === 'guide' ? 'Гид' : 'Турист'}</b>.</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`[Успех] Письмо отправлено на адрес: ${email}`);
    } catch (error) {
      console.error(`[Ошибка] Не удалось отправить письмо на ${email}:`, error);
    }
  }
}
