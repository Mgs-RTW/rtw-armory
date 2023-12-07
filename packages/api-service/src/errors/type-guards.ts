import { AuthenticationError } from "./errors";

export const isAuthenticationError = (
  error: Error
): error is AuthenticationError => {
  return error.name === "AuthenticationError";
};
