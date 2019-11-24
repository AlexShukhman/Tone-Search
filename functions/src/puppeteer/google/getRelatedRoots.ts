import * as puppeteer from "puppeteer";
import { union } from "lodash";
import {
  searchMain,
  getRootDomains,
  getNextPage,
  next_page_selector,
  waitSeconds,
  google_wait_seconds
} from "./common";
import { success, elementNotFoundError } from "../utils";
import { isError } from "../../function-utils";
import { ErrorReturn, SuccessReturn } from "../../interfaces";

const roots_num_goal = 10; // goal number of returned roots
const max_pages = 3; // max # of pages of google to search

async function getRelatedRoots(
  query: string
): Promise<ErrorReturn | SuccessReturn> {
  // Get to google
  const page_candidate: unknown = searchMain(query);

  // Handle errors
  if (isError(page_candidate)) {
    return page_candidate as ErrorReturn;
  }
  const page = page_candidate as puppeteer.Page;

  // Get roots
  const roots_candidate: unknown = await getRootDomains(page);

  // Handle errors
  if (isError(roots_candidate)) {
    return roots_candidate as ErrorReturn;
  }

  // Clean up roots
  let roots: string[] = union(roots_candidate as string[]);

  // Get more if needed
  for (let i = 2; i <= max_pages; i++) {
    if (roots.length >= roots_num_goal) {
      break;
    }

    // Avoid Google getting upset
    await waitSeconds(google_wait_seconds);

    // Get next page
    const success = await getNextPage(page);
    if (!success) {
      return elementNotFoundError(next_page_selector, page.url());
    }

    // Get more roots
    const new_candidates: unknown = await getRootDomains(page);

    if (isError(new_candidates)) {
      return new_candidates as ErrorReturn;
    }

    // Combine
    roots = union(roots);
  }

  return success(roots);
}

export { getRelatedRoots };
