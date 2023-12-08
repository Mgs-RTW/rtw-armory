export class AuthenticationError extends Error {
  constructor() {
    super("Authentication required");
    this.name = "AuthenticationError";
  }
}

export class ApiError extends Error {
  body: unknown;
  status: number;

  constructor(response: Response, body: unknown) {
    super(response.statusText);
    this.name = "ApiError";
    this.body = body;
    this.status = response.status;
  }
}

export function isAuthenticationError(
  error: Error
): error is AuthenticationError {
  return error.name === "AuthenticationError";
}

export function isApiError(error: Error): error is ApiError {
  return error.name === "ApiError";
}
