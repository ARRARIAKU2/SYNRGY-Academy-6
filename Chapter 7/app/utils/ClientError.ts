class ClientError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'client error';
    this.statusCode = statusCode;
  }
}

export default ClientError;
