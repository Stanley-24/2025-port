// server/src/test/rateLimiter.test.ts
import { contactRateLimiter } from '../../src/middleware/rateLimiter';
import { RateLimiterRes } from 'rate-limiter-flexible';

const mockReq = (body: any = {}, ip = '127.0.0.1') => ({
  body,
  ip,
} as any);

const mockRes = () => {
  const res: any = {};
  res.status = jest.fn(() => res);
  res.json = jest.fn(() => res);
  res.set = jest.fn(() => res);
  return res;
};

const mockNext = jest.fn();

describe('contactRateLimiter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('allows first request', async () => {
    const req = mockReq({ email: 'test@example.com' });
    const res = mockRes();

    await contactRateLimiter(req, res, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it('blocks after limits are exceeded', async () => {
    const req = mockReq({ email: 'spam@example.com' });
    const res = mockRes();

    // Allow a few
    for (let i = 0; i < 10; i++) {
      mockNext.mockClear();
      res.status.mockClear();
      await contactRateLimiter(req, res, mockNext);
    }

    // Next one should block
    await contactRateLimiter(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(429);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
  });
});