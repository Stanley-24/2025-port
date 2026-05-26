export interface IPayment {
  id?: string;
  tx_ref: string;
  email: string;
  fullName: string;
  service: string;
  amount: number;
  depositAmount: number;
  fullAmount: number;
  balanceDue: number;
  currency: string;
  status: 'pending' | 'successful' | 'failed';
  flutterwave_data?: any;
  meetingLink?: string;
  message: string;
  followedUp: boolean;
  emailSent: boolean;
  created_at?: string;
  updated_at?: string;
}


