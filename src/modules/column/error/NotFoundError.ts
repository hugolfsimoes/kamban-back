export class NotFoundError extends Error {
  statusCode = 404;
  constructor(message = 'Recurso não encontrado') {
    super(message);
  }
}
