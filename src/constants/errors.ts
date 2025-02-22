export class BadCredentialsError extends Error {
  constructor(public cause: string) {
    super("Bad credentials, please check your access token and associated device identifier.");
    this.name = "BadCredentialsError";
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
