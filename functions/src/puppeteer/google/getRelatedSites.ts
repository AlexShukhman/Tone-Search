import * as puppeteer from "puppeteer";
import { union } from "lodash";
import { ErrorReturn, SuccessReturn, SitesByRoot } from "../../interfaces";
import {
  searchMain,
  getSites,
  waitSeconds,
  google_wait_seconds,
  getNextPage,
  getRoot
} from "./common";
import { isError } from "../../function-utils";
import { success } from "../utils";

export async function getRelatedSites(
  query: string,
  roots?: string[]
): Promise<ErrorReturn | SuccessReturn> {
  if (roots && roots.length > 0) {
    return getRelatedSites_Sites(query, roots);
  } else {
    return getRelatedSites_NoSites(query);
  }
}

async function getRelatedSites_Sites(
  query: string,
  roots: string[]
): Promise<ErrorReturn | SuccessReturn> {
  const sites: SitesByRoot = {};

  for (const root of roots) {
    if (root !== roots[0]) {
      // Avoid Google getting upset
      waitSeconds(google_wait_seconds);
    }

    // Make a root-specific query
    const r_query = query + " site:" + root;

    // Get to google
    const page_candidate: unknown = await searchMain(r_query);

    if (isError(page_candidate)) {
      return page_candidate as ErrorReturn;
    }
    const page = page_candidate as puppeteer.Page;

    // Get URLs
    const urls_candidate = await getSites(page);

    if (isError(urls_candidate)) {
      return urls_candidate as ErrorReturn;
    }

    // Clean up URLs
    const urls = union(urls_candidate as string[]);

    // Add to `sites`
    sites[root] = urls;
  }

  return success(sites);
}

// Pretty useless, just returns two pages worth of URls
async function getRelatedSites_NoSites(
  query: string
): Promise<ErrorReturn | SuccessReturn> {
  const sites: SitesByRoot = {};

  // Get to google
  const page_candidate: unknown = await searchMain(query);

  if (isError(page_candidate)) {
    return page_candidate as ErrorReturn;
  }
  const page = page_candidate as puppeteer.Page;

  // Get URLs
  const urls_candidate_1: unknown = await getSites(page);

  if (isError(urls_candidate_1)) {
    return urls_candidate_1 as ErrorReturn;
  }

  // Clean up URLs
  let urls = union(urls_candidate_1 as string[]);

  // Avoid Google getting upset
  await waitSeconds(google_wait_seconds);

  // Get next page
  await getNextPage(page);

  // Get more URLs
  const urls_candidate_2: unknown = await getSites(page);
  if (isError(urls_candidate_2)) {
    return urls_candidate_2 as ErrorReturn;
  }

  // Clean up and append to urls
  urls = union(urls, urls_candidate_2 as string[]);

  // Sort into sites
  urls.map(url => {
    const root = getRoot(url);

    if (!sites[root]) sites[root] = [];

    sites[root].push(url);
  });

  return success(sites);
}
