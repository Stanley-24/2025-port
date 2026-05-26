export const resendMock = {
  emails: {
    send: jest.fn().mockResolvedValue({ id: 'mock-email-id' }),
  },
};
