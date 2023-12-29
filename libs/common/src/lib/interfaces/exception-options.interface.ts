export interface ExceptionOptions {
  code: string;
  status?: number;
  message?: string;
  [attributeName: string]: unknown;
}
