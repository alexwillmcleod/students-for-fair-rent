import { SmtpClient, SendConfig } from 'https://deno.land/x/smtp/mod.ts';
import { load } from 'https://deno.land/std@0.208.0/dotenv/mod.ts';
import LoginEmail from './emails/login.tsx';
import { render } from 'npm:@react-email/render';
import { Auth } from '../db/models/auth.ts';
import { User } from '../db/models/user.ts';

const env = await load();

const smtpUser: string = env['SMTP_USER'];
const smtpPass: string = env['SMTP_PASS'];
const smtpProvider: string = env['SMTP_PROVIDER'];

const baseUrl: string = env['CLIENT_BASE_URL'];

const smtpClient = new SmtpClient();
console.log('Created Client');

await smtpClient.connectTLS({
  hostname: smtpProvider,
  port: 465,
  username: smtpUser,
  password: smtpPass,
});
console.log('Connected TLS');

export class UserNotFoundError extends Error {}

export async function sendConfirmationEmail(emailAddress: string) {
  // Check that email is in use
  const foundUser = await User.findOne({ emailAddress });
  if (!foundUser) {
    throw new UserNotFoundError('no user with that email address exists');
  }
  const { _id, firstName, lastName, upi, studentId, hallOfResidence } =
    foundUser;
  const authToken = new Auth({
    user: _id,
  });
  const { token } = await authToken.save();

  const baseUrl = env['CLIENT_BASE_URL'];
  const inviteLink = `${baseUrl}/verify/${token}`;
  const emailHtml = render(
    LoginEmail({
      firstName,
      lastName,
      inviteLink,
      emailAddress,
      upi,
      studentId,
      hallOfResidence,
    })
  );
  const mailOptions: SendConfig = {
    from: 'Alex from Students for Fair Rent <alexwillmcleod@gmail.com>',
    to: [emailAddress],
    subject: 'SFR Rent Strike! 🤺',
    html: emailHtml,
  };
  await smtpClient.send(mailOptions);
}
