export class AccessDeniedError extends Error {
  constructor(public cause: string) {
    super("Access denied, you can't do this request.");
    this.name = "AccessDeniedError";
  }
}

export class BadCredentialsError extends Error {
  constructor(public cause: string) {
    super("Bad credentials, please check your access token and associated device identifier.");
    this.name = "BadCredentialsError";
  }
}

export class ContractNumberNotAuthorizedError extends Error {
  constructor(public cause: string) {
    super("Contract number given is not authorized.");
    this.name = "ContractNumberNotAuthorizedError";
  }
}

export class ExpiredTokenError extends Error {
  constructor(public cause: string) {
    super("Token has expired, please refresh it.");
    this.name = "ExpiredTokenError";
  }
}

export class TechnicalError extends Error {
  constructor(public cause: string) {
    super("An error occurred, please try again later.");
    this.name = "TechnicalError";
  }
}
