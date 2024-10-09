import { HTTPException } from "hono/http-exception";
import { StatusCode } from "hono/utils/http-status";

export enum APIErrorCode {
  NotFound = "NOT_FOUND",
  BadGateway = "BAD_GATEWAY",
  InvalidBody = "INVALID_BODY",
}

export type APIErrorIssues = Record<string, string[]>;

export interface APIErrorOptions {
  status: StatusCode;
  code: APIErrorCode;
  message: string;
  issues?: APIErrorIssues;
}

export class APIError extends HTTPException {
  readonly code: APIErrorCode;
  readonly issues?: APIErrorIssues;

  constructor({ status, message, issues, code }: APIErrorOptions) {
    super(status, {
      message,
    });
    this.code = code;
    this.issues = issues;
  }

  getResponse(): Response {
    return Response.json(
      {
        code: this.code,
        message: this.message,
        status: this.status,
        issues: this.issues,
      },
      {
        status: this.status,
      }
    );
  }
}
