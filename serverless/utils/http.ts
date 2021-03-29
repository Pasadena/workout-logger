export const okResponse = (payload: unknown, statusCode = 200) => ({
  statusCode,
  body: JSON.stringify(payload),
});
