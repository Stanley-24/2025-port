// src/emails/templates/ImmediateThankYou.tsx
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Heading,
  Text,
  Hr,
  Button,
  Section,
} from '@react-email/components';

interface ImmediateThankYouProps {
  fullName: string;
  service: string;
  meetingLink: string;
  depositAmount: number;
  fullAmount: number;
  balanceDue: number;
  message?: string;
  currency?: string;
  locale?: string;
}

export const ImmediateThankYou = ({
  fullName,
  service,
  meetingLink,
  depositAmount,
  fullAmount,
  balanceDue,
  message,
  currency = '₦',
  locale = 'en-NG',
}: ImmediateThankYouProps) => (
  <Html>
    <Head />
    <Preview>Your deposit was received — let's get started!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Thank You, {fullName}! 🎉</Heading>

        <Text style={text}>
          Your <strong>70% deposit</strong> of <strong>{currency}{depositAmount.toLocaleString(locale)}</strong>for <strong>{service}</strong> has been successfully received.
        </Text>

        <Text style={text}>
          Full project amount: <strong>₦{fullAmount.toLocaleString()}</strong><br />
          Remaining balance (30%): <strong>₦{balanceDue.toLocaleString()}</strong> — I'll send an invoice before final delivery.
        </Text>

        {message && message.trim() !== '' && (
          <Section style={messageSection}>
            <Text style={messageLabel}>Your Message / Instructions:</Text>
            <Text style={messageText}>"{message}"</Text>
            <Text style={text}>
              Thank you for the details — this helps me deliver exactly what you need!
            </Text>
          </Section>
        )}

        <Text style={text}>
          To kick off your project, please schedule our initial meeting:
        </Text>

        <div style={buttonContainer}>
          <Button style={button} href={meetingLink}>
            Schedule Meeting
          </Button>
        </div>

        <Text style={text}>
          I'm excited to bring your vision to life!
        </Text>

        <Hr style={hr} />

        <Text style={footer}>
          Best regards,<br />
          Stanley Owarieta<br />
          Backend Software Engineer
        </Text>
      </Container>
    </Body>
  </Html>
);

// Styles
const main = { backgroundColor: '#000000', fontFamily: "'Helvetica Neue', Arial, sans-serif" };
const container = { backgroundColor: '#1A1A1A', padding: '40px', borderRadius: '12px', border: '1px solid #38383B', maxWidth: '600px', margin: '40px auto' };
const heading = { color: '#F2CA46', fontSize: '32px', fontWeight: 'bold', textAlign: 'center' as const };
const text = { color: '#E6BD37', fontSize: '16px', lineHeight: '1.6', margin: '20px 0' };
const buttonContainer = { textAlign: 'center' as const, margin: '30px 0' };
const button = { backgroundColor: '#F2CA46', color: '#000000', padding: '16px 36px', borderRadius: '8px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' };
const hr = { borderColor: '#38383B', margin: '40px 0' };
const footer = { color: '#ab8000', fontSize: '14px', textAlign: 'center' as const };

// New styles for message section
const messageSection = { backgroundColor: '#252525', padding: '20px', borderRadius: '8px', margin: '24px 0', border: '1px solid #38383B' };
const messageLabel = { color: '#F2CA46', fontWeight: 'bold', marginBottom: '8px' };
const messageText = { color: '#ffffff', fontStyle: 'italic', margin: '12px 0', backgroundColor: '#1a1a1a', padding: '12px', borderRadius: '6px' };

export default ImmediateThankYou;