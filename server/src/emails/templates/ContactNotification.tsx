import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
} from '@react-email/components';

interface ContactNotificationProps {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

export const ContactNotificationEmail = ({
  fullName,
  email,
  subject,
  message,
}: ContactNotificationProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={heading}>New Contact Form Submission</Heading>
          <Text style={subheading}>
            Someone just reached out through stanleyowarieta.com
          </Text>
        </Section>

        <Hr style={hr} />

        <Section style={infoSection}>
          <Text style={label}>From:</Text>
          <Text style={value}>{fullName}</Text>

          <Text style={label}>Email:</Text>
          <Text style={value}>
            <a href={`mailto:${email}`} style={link}>{email}</a>
          </Text>

          <Text style={label}>Subject:</Text>
          <Text style={value}>{subject}</Text>
        </Section>

        <Hr style={hr} />

        <Section style={messageSection}>
          <Text style={label}>Message:</Text>
          <Text style={messageText}>{message}</Text>
        </Section>

        <Section style={footer}>
          <Text style={footerText}>
            Sent via Stanley Owarieta Portfolio • {new Date().getFullYear()}
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);


const main = { backgroundColor: '#000000', borderRadius: '8px', fontFamily: "'Helvetica Neue', Arial, sans-serif" };
const container = { backgroundColor: '#282828', borderRadius: '8px',  margin: '20px auto', padding: '32px', maxWidth: '600px' };
const header = { textAlign: 'center' as const };
const heading = { fontSize: '28px', fontWeight: 'bold', color: '#F2CA46', margin: '0 0 12px 0' };
const subheading = { fontSize: '16px', color: '#DAA425', margin: '0' };
const hr = { borderColor: '#38383B', margin: '32px 0' };
const infoSection = { padding: '0 20px' }; // ← This was missing!
const label = { fontSize: '14px', color: '#ab8000', margin: '16px 0 4px 0', fontWeight: '600' };
const value = { fontSize: '18px', color: '#F2CA46', margin: '0 0 16px 0', wordBreak: 'break-word' as const };
const link = { color: '#D3AF37', textDecoration: 'underline' };
const messageSection = { backgroundColor: '#282828', padding: '8px', borderRadius: '8px', border: '1px solid #474747', margin: '0 8px' };
const messageText = { fontSize: '16px', color: '#E6BD37', lineHeight: '1.6', whiteSpace: 'pre-wrap' as const };
const footer = { marginTop: '40px', textAlign: 'center' as const };
const footerText = { fontSize: '12px', color: '#f8f8f8' };