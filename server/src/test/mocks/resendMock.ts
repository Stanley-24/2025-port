export const resendMock = {
  emails: {
    send: jest.fn().mockResolvedValue({ data: { id: '123' } }),
  },
};