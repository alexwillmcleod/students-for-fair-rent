import { load } from 'https://deno.land/std@0.208.0/dotenv/mod.ts';
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from 'npm:@react-email/components';
import * as React from 'npm:react';

interface ConfirmUserEmailProps {
  firstName?: string;
  lastName?: string;
  emailAddress: string;
  upi?: string;
  studentId?: string;
  hallOfResidence: string;
  inviteLink: string;
}

const env = await load();
const baseUrl = env['CLIENT_BASE_URL'];

export const ConfirmUserEmail = ({
  firstName,
  lastName,
  studentId,
  upi,
  emailAddress,
  hallOfResidence,
  inviteLink,
}: ConfirmUserEmailProps) => {
  return (
    <Html lang="en">
      <Head />
      <Preview>Students for Fair Rent Strike! 🤺</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/images/navbar-logo-without-text.png`}
                width="40"
                // height="37"
                alt="Vercel"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-black text-2xl font-normal text-center p-0 my-[30px] mx-0">
              Join the <strong>Student Rent Strike</strong> 🤺
            </Heading>
            <Text className="text-black text-lg leading-lg">
              Kia Ora {firstName || 'Anonymous'} 🥰,
            </Text>
            <Text className="text-black text-lg leading-lg">
              We're confirming
            </Text>
            <table className="table-auto even:bg-blue-100 w-full mt-4 rounded-lg">
              <tr>
                <td className="p-2 rounded-sm">Email</td>
                <td className="p-2 rounded-sm">{emailAddress}</td>
              </tr>
              {firstName && (
                <tr>
                  <td className="p-2 rounded-sm">Name</td>
                  <td className="p-2 rounded-sm">
                    {firstName} {lastName}
                  </td>
                </tr>
              )}
              {studentId && (
                <tr>
                  <td className="p-2 rounded-sm">Student ID</td>
                  <td className="p-2 rounded-sm">{studentId}</td>
                </tr>
              )}
              {upi && (
                <tr>
                  <td className="p-2 rounded-sm">Student UPI</td>
                  <td className="p-2 rounded-sm">{upi}</td>
                </tr>
              )}
              <tr>
                <td className="p-2 rounded-sm">Hall of Residence</td>
                <td className="p-2 rounded-sm">{hallOfResidence}</td>
              </tr>
            </table>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center py-3 px-5"
                href={inviteLink}
              >
                Let's Strike!
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              or copy and paste this URL into your browser:{' '}
              <Link
                href={inviteLink}
                className="text-blue-600 no-underline"
              >
                {inviteLink}
              </Link>
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This email was intended for{' '}
              <span className="text-black">{firstName} </span>
              If you were not expecting this, you can ignore this email. If you
              are concerned about your account's safety, please reply to this
              email to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ConfirmUserEmail;
