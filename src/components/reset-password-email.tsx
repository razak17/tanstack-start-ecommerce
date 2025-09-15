import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface ForgotPasswordEmailProps {
  name: string;
  resetUrl: string;
  userEmail: string;
}

const ResetPasswordEmail = (props: ForgotPasswordEmailProps) => {
  const { name, resetUrl, userEmail } = props;

  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>Reset your password - Action required</Preview>
        <Body className="bg-gray-100 py-[40px] font-sans">
          <Container className="mx-auto max-w-[600px] rounded-[8px] bg-white p-[40px] shadow-sm">
            {/* Header */}
            <Section className="mb-[32px] text-center">
              <Heading className="m-0 mb-[8px] font-bold text-[28px] text-gray-900">
                Reset Your Password
              </Heading>
              <Text className="m-0 text-[16px] text-gray-600">
                We received a request to reset your password
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="m-0 mb-[16px] text-[16px] text-gray-700 leading-[24px]">
                Hello, {name}
              </Text>
              <Text className="m-0 mb-[16px] text-[16px] text-gray-700 leading-[24px]">
                We received a password reset request for your account associated
                with <strong>{userEmail}</strong>.
              </Text>
              <Text className="m-0 mb-[24px] text-[16px] text-gray-700 leading-[24px]">
                Click the button below to create a new password. This link will
                expire in 24 hours for security reasons.
              </Text>
            </Section>

            {/* Reset Button */}
            <Section className="mb-[32px] text-center">
              <Button
                href={resetUrl}
                className="box-border inline-block rounded-[8px] bg-blue-600 px-[32px] py-[16px] font-semibold text-[16px] text-white no-underline"
              >
                Reset Password
              </Button>
            </Section>

            {/* Alternative Link */}
            <Section className="mb-[32px]">
              <Text className="m-0 mb-[8px] text-[14px] text-gray-600 leading-[20px]">
                If the button doesn&apos;t work, copy and paste this link into
                your browser:
              </Text>
              <Link
                href={resetUrl}
                className="break-all text-[14px] text-blue-600"
              >
                {resetUrl}
              </Link>
            </Section>

            {/* Security Notice */}
            <Section className="mb-[32px] rounded-[8px] bg-gray-50 p-[20px]">
              <Text className="m-0 mb-[8px] font-semibold text-[14px] text-gray-700 leading-[20px]">
                Security Notice:
              </Text>
              <Text className="m-0 mb-[8px] text-[14px] text-gray-600 leading-[20px]">
                • If you didn&apos;t request this password reset, please ignore
                this email
              </Text>
              <Text className="m-0 mb-[8px] text-[14px] text-gray-600 leading-[20px]">
                • This link will expire in 24 hours
              </Text>
              <Text className="m-0 text-[14px] text-gray-600 leading-[20px]">
                • For security, never share this link with anyone
              </Text>
            </Section>

            {/* Help Section */}
            <Section className="mb-[32px]">
              <Text className="m-0 text-[14px] text-gray-600 leading-[20px]">
                Need help? Contact our support team at{" "}
                <Link href="mailto:help@razakmo.tech" className="text-blue-600">
                  support@ecommerce.razakmo.tech
                </Link>
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-gray-200 border-t pt-[24px]">
              <Text className="m-0 mb-[8px] text-[12px] text-gray-500 leading-[16px]">
                This email was sent to {userEmail}
              </Text>
              <Text className="m-0 mb-[8px] text-[12px] text-gray-500 leading-[16px]">
                Evershop, 123 Business Street, Accra, Ghana
              </Text>
              <Text className="m-0 text-[12px] text-gray-500 leading-[16px]">
                &copy; {new Date().getFullYear()} Evershop. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ResetPasswordEmail;
