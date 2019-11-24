import * as ToneAnalyzerV3 from "ibm-watson/tone-analyzer/v3";
import { IamAuthenticator } from "ibm-watson/auth";
import { ErrorReturn, SuccessReturn } from "../../interfaces";
import { analysisError } from "../utils";
import { success } from "../../puppeteer/utils";

export const analyzeString = async (
  text: string,
  apikey: string,
  url: string
): Promise<ErrorReturn | SuccessReturn> => {
  const tone_analyzer = new ToneAnalyzerV3({
    version: "2017-09-21",
    authenticator: new IamAuthenticator({
      apikey
    }),
    url,
    disableSslVerification: true
  });

  const tone_params = {
    toneInput: { text },
    contentType: "application/json"
  };

  try {
    return success(tone_analyzer.tone(tone_params));
  } catch (e) {
    return analysisError(text, e);
  }
};
