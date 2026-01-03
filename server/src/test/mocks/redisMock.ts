// src/test/mocks/redisMock.ts
export const redisClientMock = {
  on: jest.fn(),
  connect: jest.fn(),
  disconnect: jest.fn(),
  // Add any methods you use
};