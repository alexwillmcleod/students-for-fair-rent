import { SmtpClient, SendConfig } from 'https://deno.land/x/smtp/mod.ts';
import 'https://deno.land/std@0.208.0/dotenv/load.ts';
import ConfirmUserEmail from './emails/confirm.tsx';
import LoginUserEmail from './emails/login.tsx';
import { render } from 'npm:@react-email/render';
import { Auth } from '../db/models/auth.ts';
import { User } from '../db/models/user.ts';

const TEN_MINUTES = 600000;

const smtpUser: string = Deno.env.get('SMTP_USER')!;
const smtpPass: string = Deno.env.get('SMTP_PASS')!;
const smtpProvider: string = Deno.env.get('SMTP_PROVIDER')!;

const baseUrl: string = Deno.env.get('CLIENT_BASE_URL')!;
const smtpClient = new SmtpClient();

export class UserNotFoundError extends Error {}

export async function sendLoginEmail(emailAddress: string) {
  await smtpClient.connectTLS({
    hostname: smtpProvider,
    port: 465,
    username: smtpUser,
    password: smtpPass,
  });

  // Check that email is in use
  const foundUser = await User.findOne({ emailAddress });
  if (!foundUser) {
    throw new UserNotFoundError('no user with that email address exists');
  }
  const { _id, firstName, lastName, upi, studentId, hallOfResidence } =
    foundUser;
  const randomValue = crypto.randomUUID();
  const authToken = new Auth({
    user: _id,
    token: randomValue,
    expiresAt: Date.now() + TEN_MINUTES,
  });
  const { token } = await authToken.save();

  const inviteLink = `${baseUrl}/verify/${token}`;
  const emailHtml = foundUser.isVerified
    ? render(
        LoginUserEmail({
          firstName,
          inviteLink,
        })
      )
    : render(
        ConfirmUserEmail({
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
    to: emailAddress,
    subject: 'SFR Rent Strike! 🤺',
    content: emailHtml,
  };
  await smtpClient.send(mailOptions);
  smtpClient.close();
}
