export interface ApiErrorResponse {
  status: number;
  code: string;
  message: string;
  errors?: string[];
}

export class ApiRequestError extends Error {
  public readonly status?: number;
  public readonly code: string;
  public readonly details?: string[];

  constructor(
    code: string,
    message: string,
    status?: number,
    details?: string[],
    cause?: unknown
  ) {
    super(message, { cause });
    this.name = "ApiRequestError";
    this.code = code;
    this.status = status;
    this.details = details;
  }
}