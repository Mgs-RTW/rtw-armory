import {
  AuthenticationError,
  AuthorizationError,
  InvalidCredentialsError,
} from "./errors";

export const isAuthenticationError = (
  error: Error
): error is AuthenticationError => {
  return error.name === "AuthenticationError";
};

export const isAuthorizationError = (
  error: Error
): error is AuthenticationError => {
  return error instanceof AuthorizationError;
};

export const isInvalidCredentialsError = (
  error: Error
): error is InvalidCredentialsError => {
  return error instanceof InvalidCredentialsError;
};
