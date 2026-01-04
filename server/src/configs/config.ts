interface Config {
  MONGO_URI: string;
  REDIS_URL: string;
  RESEND_API_KEY: string;
  AdminEmail: string;
  SenderEmail: string;
  PORT: string;
  FRONTEND_URL: string;
  publicKey: string;
  secretKey: string;
  encryptionKey: string;
  webhookSecret: string;
  meetingLink: string;
}

const config: Config = {
  MONGO_URI: process.env.MONGO_URI || (() => { throw new Error(
    'MONGO_URI is not defined in environment variables');
  })(),

  REDIS_URL: process.env.REDIS_URL || (() => { throw new Error(
    'REDIS_URL is not defined in environment variables');
  })(),
  RESEND_API_KEY: process.env.RESEND_API_KEY || (() => { throw new Error(
    'RESEND_API_KEY is not defined in environment variables');
  })(),
  AdminEmail: process.env.AdminEmail || (() => { throw new Error(
    'AdminEmail is not defined in environment variables');
  })(),
  SenderEmail: process.env.SenderEmail || (() => { throw new Error(
    'SenderEmail is not defined in environment variables');
  })(),
  PORT: process.env.PORT || (() => { throw new Error(
    'PORT is not defined in environment variables');
  })(),
  FRONTEND_URL: process.env.FRONTEND_URL || (() => { throw new Error(
    'FRONTEND_URL is not defined in environment variables');
  })(),
  publicKey: process.env.FLUTTERWAVE_PUBLIC_KEY! || (() => { throw new Error(
    'FLUTTERWAVE_PUBLIC_KEY is not defined in environment variables');
  })(),
  secretKey: process.env.FLUTTERWAVE_SECRET_KEY! || (() => { throw new Error(
    'FLUTTERWAVE_SECRET_KEY is not defined in environment variables');
  })(),
  encryptionKey: process.env.FLUTTERWAVE_ENCRYPTION_KEY! || (() => { throw new Error(
    'FLUTTERWAVE_ENCRYPTION_KEY is not defined in environment variables');
  })(),
  webhookSecret: process.env.FLUTTERWAVE_WEBHOOK_SECRET! || (() => { throw new Error(
    'FLUTTERWAVE_WEBHOOK_SECRET is not defined in environment variables');
  })(),
  meetingLink: process.env.MEETING_LINK || 'https://calendly.com/stanleyowarieta/meeting'
};

export default config;

