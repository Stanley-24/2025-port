export type Bindings = {
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  // Optional direct Postgres URL for future SQL clients; use pooler port 6543 in serverless.
  SUPABASE_DB_URL?: string;
  RESEND_API_KEY: string;
  AdminEmail: string;
  SenderEmail: string;
  FRONTEND_URL: string;
  FLUTTERWAVE_PUBLIC_KEY: string;
  FLUTTERWAVE_SECRET_KEY: string;
  FLUTTERWAVE_ENCRYPTION_KEY: string;
  FLUTTERWAVE_WEBHOOK_SECRET: string;
  MEETING_LINK: string;
  PaymentLogo: string;
};
