// src/test/mocks/configMock.ts
export const mockConfig = {
  MONGO_URI: 'mongodb://localhost:27017/test-db', // Will be overridden by in-memory
  RESEND_API_KEY: 're_test_fake',
  REDIS_URL: 'redis://localhost:6379',
  PORT: '8000',
  AdminEmail: 'admin@test.com',
  SenderEmail: 'noreply@test.com',
};