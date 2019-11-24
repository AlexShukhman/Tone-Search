import { ErrorReturn, SuccessReturn } from "../../interfaces";
import { analysisError } from "../utils";

export const analyzeString = async (
  s: string
): Promise<ErrorReturn | SuccessReturn> => {
  return analysisError(s, "Not Yet Implemented");
};
