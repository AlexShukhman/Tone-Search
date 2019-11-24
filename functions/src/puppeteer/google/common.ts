import * as puppeteer from "puppeteer";
import { PInput, ErrorReturn } from "../../interfaces";
import {
  keys,
  newPage,
  elementNotFoundError,
  hrefNotFoundError
} from "../utils";

const search_engine_url = "https://google.com/";
const search_bar_selector = 'input[maxlength="2048"]';
const successful_page_load_selector = 'div[id="center_col"]';
const site_string_selector = "cite"; // all sites are using the `cite` tag
export const google_wait_seconds = 10; // time to wait between page requests
export const next_page_selector = 'a[id="pnnext"]';
const second_level_domains = [
  // TODO: update with more, these are mostly UK
  "ac",
  "co",
  "gov",
  "ltd",
  "me",
  "mod",
  "mil",
  "net",
  "nhs",
  "nic",
  "org",
  "parliament",
  "plc",
  "sch"
];

export async function waitSeconds(s: number) {
  const ms = Math.ceil(s * 1000);

  await new Promise(resolve => setTimeout(() => resolve(), ms));
}

// Get root domain of url string
export function getRoot(url: string): string {
  let pieces = url.split("/")[2].split(".");

  if (second_level_domains.includes(pieces[pieces.length - 2])) {
    pieces = pieces.slice(-3);
  } else {
    pieces = pieces.slice(-2);
  }

  if (pieces[0] === "www") {
    // should already be done, but for safety
    pieces.shift();
  }

  return pieces.join(".");
}

// Search main search_engine_url
export async function searchMain(
  query: string
): Promise<puppeteer.Page | ErrorReturn> {
  // Get Google
  const page = await newPage(search_engine_url, search_bar_selector);

  // Avoid Google getting upset
  await waitSeconds(google_wait_seconds);

  // Search
  await page.$eval(search_bar_selector, el => ((el as PInput).value = query));
  const elHandle = await page.$(search_bar_selector);
  if (elHandle) elHandle.press(keys.ENTER);
  else return elementNotFoundError(search_bar_selector, page.url());
  await page.waitFor(successful_page_load_selector);

  return page;
}

// Get all root domains on current search page
export async function getRootDomains(
  page: puppeteer.Page
): Promise<string[] | ErrorReturn> {
  // Get Sites
  const sites = await page.$$(site_string_selector);
  if (sites.length === 0) {
    return elementNotFoundError(site_string_selector, page.url());
  }

  const urls: string[] = [];

  // Agglomerate sites
  for (const site of sites) {
    const text = await page.evaluate(site => site.textContent, site);
    urls.push(text);
  }

  let roots = urls.map(_url => {
    const url = _url.split(" ")[0];
    return getRoot(url);
  });

  return roots;
}

// Press `Next` on current search page
export async function getNextPage(page: puppeteer.Page): Promise<boolean> {
  // Returns false if error
  try {
    await page.click(next_page_selector);
  } catch {
    return false;
  }
  await page.waitForSelector(successful_page_load_selector);
  return true;
}

// Get full site url of each site
export async function getSites(
  page: puppeteer.Page
): Promise<string[] | ErrorReturn> {
  // Get Sites
  const sites = await page.$$(site_string_selector);
  if (sites.length === 0) {
    return elementNotFoundError(site_string_selector, page.url());
  }

  const parents = await Promise.all(
    sites.map(async site => {
      return (await site.$x("../.."))[0];
    })
  );

  const urls: string[] = [];

  for (const parent of parents) {
    const url = await page.evaluate(parent => parent.href, parent);

    if (!url) {
      const el_string = await parent.toString();
      return hrefNotFoundError(el_string, page.url());
    }
  }

  return urls;
}
