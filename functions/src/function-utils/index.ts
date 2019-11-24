import * as functions from "firebase-functions";
import { SuccessReturn, ErrorReturn, UserErrorReturn } from "../interfaces";

export function isUserError(o: any): boolean {
  return !!o.userError;
}

export function isError(o: any) {
  return o.userError || o.err;
}

export function respond(
  res: functions.Response,
  body: SuccessReturn | ErrorReturn | UserErrorReturn
) {
  if (body.success === false) {
    return res.json(body);
  } else if (isUserError(body)) {
    return res.status(400).json(body);
  } else {
    return res.status(500).json(body);
  }
}

export function userError(e: string): UserErrorReturn {
  return {
    success: false,
    userError: e
  };
}
