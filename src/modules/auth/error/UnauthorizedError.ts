export class UnauthorizedError extends Error {
  statusCode = 401;
  constructor(message = 'Credenciais inválidas') {
    super(message);
  }
}