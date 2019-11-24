import * as puppeteer from "puppeteer";
import { ErrorReturn, SuccessReturn } from "../../interfaces";

// Non-string keys
export const keys = {
  ENTER: "Enter"
};

export function elementNotFoundError(
  element: string,
  page: string
): ErrorReturn {
  return {
    success: false,
    err: `Element ${element} not found on page ${page}`
  };
}

export function hrefNotFoundError(element: string, page: string): ErrorReturn {
  return {
    success: false,
    err: `Element ${element} doesn't appear to have an href. Found on page: ${page}`
  };
}

export function success(body: any): SuccessReturn {
  return {
    success: true,
    res: {
      message: "Successfully found element(s)",
      body
    }
  };
}

export async function newPage(
  url: string,
  wait_selector?: string
): Promise<puppeteer.Page> {
  // Open Browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Go to page
  if (!wait_selector) {
    await page.goto(url, { waitUntil: "networkidle2" });
  } else {
    await page.goto(url);
    await page.waitForSelector(wait_selector);
  }

  return page;
}
