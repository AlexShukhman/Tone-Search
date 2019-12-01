import * as functions from "firebase-functions";
import { userError, respond } from "../function-utils";
import { UserErrorReturn } from "../interfaces";
import { analyzeString as _analyzeString } from "./tone";

const validateS = (s: string | null): UserErrorReturn | false => {
  if (!s) {
    // TODO: better validation
    return userError("Missing query param `s`");
  }
  return false;
};

export const analyzeString = functions.https.onRequest(
  async (req: functions.Request, res: functions.Response) => {
    const s: string = req.query.s;
    const url: string = req.query.url;
    const apikey: string = req.query.apikey;

    const s_error = validateS(s);

    if (s_error) {
      respond(res, s_error);
    } else {
      respond(res, await _analyzeString(s, apikey, url));
    }
  }
);
