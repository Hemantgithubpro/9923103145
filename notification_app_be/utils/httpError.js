export class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "error" : "fail";
  }
}

export function badRequest(message) {
  return new HttpError(400, message);
}

export function notFound(message) {
  return new HttpError(404, message);
}