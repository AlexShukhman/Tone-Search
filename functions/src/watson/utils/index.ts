import { SuccessReturn, ErrorReturn } from "../../interfaces";

export function success(body: any): SuccessReturn {
  return {
    success: true,
    res: {
      message: "Successfully analyzed.",
      body
    }
  };
}

export function analysisError(s: string, e: string): ErrorReturn {
  return {
    success: false,
    err: `Analysis of string: ${s} failed because ${e}`
  };
}
