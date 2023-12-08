// @deno-types="npm:@types/nodemailer"
import { createTransport } from 'npm:nodemailer';
import { load } from 'https://deno.land/std@0.208.0/dotenv/mod.ts';
import Mail from 'npm:@types/nodemailer';
import LoginEmail from './emails/login.tsx';
import { render } from 'npm:@react-email/render';

const env = await load();

const smtpUser: string = env['SMTP_USER'];
const smtpPass: string = env['SMTP_PASS'];
const smtpProvider: string = env['SMTP_PROVIDER'];

const { sendMail } = createTransport({
  service: smtpProvider,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

export async function send(email: string) {
  const firstName = 'Alex';
  const lastName = 'McLeod';
  const generatedCode = 'abc123';
  const emailHtml = render(LoginEmail({ firstName, lastName, generatedCode }));
  const mailOptions: Mail.SendMailOptions = {
    from: 'Alex from Students for Fair Rent',
    to: email,
    subject: 'SFR Rent Strike! 🤺',
    html: emailHtml,
  };
  await sendMail(mailOptions);
}
