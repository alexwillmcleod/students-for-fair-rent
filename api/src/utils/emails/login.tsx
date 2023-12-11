import 'https://deno.land/std@0.208.0/dotenv/load.ts';
import 'npm:@react-email/tailwind';
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
// @deno-types="npm:@types/react"
import * as React from 'npm:react';

interface LoginEmailProps {
  firstName?: string;
  inviteLink: string;
}

const baseUrl = Deno.env.get('CLIENT_BASE_URL');

export const LoginEmail = ({ firstName, inviteLink }: LoginEmailProps) => {
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
              Log in to <strong>Student Rent Strike</strong> 🤺
            </Heading>
            <Text className="text-black text-lg leading-lg">
              Welcome Back {firstName || 'Anonymous'} 🥰,
            </Text>
            <Text className="text-black text-lg leading-lg">
              It's great to have you back!
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center py-3 px-5"
                href={inviteLink}
              >
                Log in
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
            {firstName && (
              <Text className="text-[#666666] text-[12px] leading-[24px]">
                This email was intended for{' '}
                <span className="text-black">{firstName} </span>
                If you were not expecting this, you can ignore this email. If
                you are concerned about your account's safety, please reply to
                this email to get in touch with us.
              </Text>
            )}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default LoginEmail;
