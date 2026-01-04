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
} from '@react-email/components';

interface ImmediateThankYouProps {
  fullName: string;
  service: string;
  meetingLink: string;
}

export const ImmediateThankYou = ({ fullName, service, meetingLink }: ImmediateThankYouProps) => (
  <Html>
    <Head />
    <Preview>Payment Successful - Let's Schedule!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Thank You, {fullName}! 🎉</Heading>
        <Text style={text}>
          Your payment for <strong>{service}</strong> was successful. I'm excited to work with you!
        </Text>
        <Text style={text}>
          To get started, please schedule a meeting at your convenience:
        </Text>
        <div style={buttonContainer}>
          <Button style={button} href={meetingLink}>
            Schedule Meeting
          </Button>
        </div>
        <Text style={text}>
          I'll see you soon!
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

const main = { backgroundColor: '#000000', fontFamily: "'Helvetica Neue', Arial, sans-serif" };
const container = { backgroundColor: '#1A1A1A', padding: '40px', borderRadius: '12px', border: '1px solid #38383B', maxWidth: '600px', margin: '40px auto' };
const heading = { color: '#F2CA46', fontSize: '32px', fontWeight: 'bold', textAlign: 'center' as const };
const text = { color: '#E6BD37', fontSize: '16px', lineHeight: '1.6', margin: '20px 0' };
const buttonContainer = { textAlign: 'center' as const, margin: '30px 0' };
const button = { backgroundColor: '#F2CA46', color: '#000000', padding: '14px 32px', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', textDecoration: 'none' };
const hr = { borderColor: '#38383B', margin: '40px 0' };
const footer = { color: '#ab8000', fontSize: '14px', textAlign: 'center' as const };

export default ImmediateThankYou;