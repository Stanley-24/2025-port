import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
} from '@react-email/components';

interface ContactConfirmationProps {
  fullName: string;
}

export const ContactConfirmationEmail = ({ fullName }: ContactConfirmationProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={heading}>Thanks for Getting in Touch!</Heading>
          <Text style={subheading}>Hi {fullName}, I’ve received your message.</Text>
        </Section>

        <Hr style={hr} />

        <Section>
          <Text style={bodyText}>
            Thank you for reaching out through my portfolio. I appreciate your interest!
          </Text>
          <Text style={bodyText}>
            I'll review your message and get back to you as soon as possible — usually within 24-48 hours.
          </Text>
        </Section>

        <Section style={signature}>
          <Text style={signoff}>Best regards,</Text>
          <Text style={name}>Stanley Owarieta</Text>
          <Text style={title}>Backend Software Engineer @ Rental Wave </Text>
        </Section>

        <Section style={footer}>
          <Text style={footerText}>
            © {new Date().getFullYear()} Stanley Owarieta
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const main = { backgroundColor: '#000000', fontFamily: "'Helvetica Neue', Arial, sans-serif", border: '1px solid #F2CA46', borderRadius: '8px' };
const container = {  backgroundColor: '#282828', borderRadius: '8px', margin: '20px auto', padding: '32px', maxWidth: '600px' };
const header = { textAlign: 'center' as const };
const heading = { fontSize: '28px', fontWeight: 'bold', color: '#F2CA46' };
const subheading = { fontSize: '18px', color: '#DAA425' };
const hr = { borderColor: '#38383B', margin: '32px 0' };
const bodyText = { fontSize: '16px', color: '#E6BD37', lineHeight: '1.6', margin: '16px 0' };
const signature = { marginTop: '32px' };
const signoff = { fontSize: '18px', color: '#D3AF37' };
const name = { fontSize: '24px', fontWeight: 'bold', color: '#F2CA46' };
const title = { fontSize: '14px', color: '#ab8000' };
const footer = { marginTop: '40px', textAlign: 'center' as const };
const footerText = { fontSize: '12px', color: '#f8f8f8' };