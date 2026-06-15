import axios from 'axios';
import type { Bindings } from '../configs/bindings';
import { webhook } from '../controllers/paymentController';
import { handleWebhookEvent } from '../services/paymentService';

jest.mock('axios');
jest.mock('../services/paymentService', () => ({
  initiatePayment: jest.fn(),
  handleWebhookEvent: jest.fn(),
}));
jest.mock('../lib/loggers', () => ({
  __esModule: true,
  default: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockHandleWebhookEvent = handleWebhookEvent as jest.MockedFunction<typeof handleWebhookEvent>;

const mockEnv: Bindings = {
  SUPABASE_URL: 'https://mock.supabase.co',
  SUPABASE_SERVICE_ROLE_KEY: 'mock-service-role-key',
  RESEND_API_KEY: 're_test_fake',
  AdminEmail: 'admin@test.com',
  SenderEmail: 'noreply@test.com',
  FRONTEND_URL: 'http://localhost:5173',
  FLUTTERWAVE_PUBLIC_KEY: 'FLWPUBK_TEST-fake',
  FLUTTERWAVE_SECRET_KEY: 'FLWSECK_TEST-fake',
  FLUTTERWAVE_ENCRYPTION_KEY: 'test-enc-key',
  FLUTTERWAVE_SECRET_HASH: 'test-secret-hash',
  FLUTTERWAVE_WEBHOOK_SECRET: 'legacy-webhook-secret',
  MEETING_LINK: 'https://calendly.com/test',
  PaymentLogo: 'https://example.com/logo.png',
};

const makeContext = ({
  headers,
  payload,
  executionCtx,
}: {
  headers: Record<string, string | undefined>;
  payload: unknown;
  executionCtx?: { waitUntil: (promise: Promise<unknown>) => void };
}) => {
  const normalizedHeaders = Object.fromEntries(
    Object.entries(headers).map(([k, v]) => [k.toLowerCase(), v])
  );

  const c: any = {
    env: mockEnv,
    req: {
      header: (name: string) => normalizedHeaders[name.toLowerCase()] ?? null,
      json: jest.fn().mockResolvedValue(payload),
    },
    executionCtx,
    text: jest.fn((body: string, status = 200) => ({ body, status })),
  };

  return c;
};

describe('paymentController webhook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns 401 when webhook signature is missing', async () => {
    const c = makeContext({ headers: {}, payload: {} });

    const response = await webhook(c);

    expect(response.status).toBe(401);
    expect(c.text).toHaveBeenCalledWith('Unauthorized', 401);
  });

  it('returns 401 when webhook signature does not match', async () => {
    const c = makeContext({
      headers: { 'verif-hash': 'invalid-signature' },
      payload: {},
    });

    const response = await webhook(c);

    expect(response.status).toBe(401);
    expect(c.text).toHaveBeenCalledWith('Unauthorized', 401);
  });

  it('accepts X-Flutterwave-Signature and responds immediately while processing in waitUntil', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        status: 'success',
        data: { status: 'successful', tx_ref: 'STAN-TEST-REF' },
      },
    } as any);

    let resolveBackgroundWork: (() => void) | undefined;
    const backgroundWork = new Promise<void>((resolve) => {
      resolveBackgroundWork = resolve;
    });
    mockHandleWebhookEvent.mockReturnValueOnce(backgroundWork as unknown as Promise<void>);

    let waitUntilPromise: Promise<unknown> | undefined;
    const waitUntil = jest.fn((promise: Promise<unknown>) => {
      waitUntilPromise = promise;
    });

    const c = makeContext({
      headers: { 'X-Flutterwave-Signature': 'test-secret-hash' },
      payload: {
        event: 'charge.completed',
        data: {
          id: 'tx-123',
          tx_ref: 'STAN-TEST-REF',
          status: 'successful',
        },
      },
      executionCtx: { waitUntil },
    });

    const response = await webhook(c);

    expect(response.status).toBe(200);
    expect(c.text).toHaveBeenCalledWith('OK', 200);
    expect(waitUntil).toHaveBeenCalledTimes(1);

    resolveBackgroundWork?.();
    await waitUntilPromise;

    expect(mockHandleWebhookEvent).toHaveBeenCalledTimes(1);
  });
});
