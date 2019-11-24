import { HTMLRet, SuccessReturn } from "../../interfaces";
import { newPage, success } from "../utils";

export async function getPages(urls: string[]): Promise<SuccessReturn> {
  const htmls: HTMLRet = {};

  for (const url of urls) {
    const page = await newPage(url);
    htmls[url] = await page.content();
  }

  return success(htmls);
}
