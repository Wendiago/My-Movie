export const INVALID_LOGIN_ERROR_MESSAGE = "Email or password is incorrect";
export const ACCOUNT_NOT_VERIFIED_ERROR_MESSAGE =
  "Account has not been verified";

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  CONFLICT = 409,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum ErrorCode {
  ACCOUNT_NOT_VERIFIED = 1010210,
  EMAIL_NOT_FOUND = 1010205,
  INCORRECT_PASSWORD = 1010206,
}

export enum Providers {
  Credentials = "credentials",
  Google = "google",
}
