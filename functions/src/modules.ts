/**
 * For calling locally from sdk, terminal or bash script
 *
 * Modules:
 * --- Search ---
 * * getRelatedRoots(query: string): Promise<string[]>
 * * getRelatedSites(query: string, roots?: string[]): Promise<string[]>
 * --- Get Pages ---
 * * getPages(urls: string[]): Promise<string[]>
 * --- Analyze ---
 * * analyzeString(s: string): Promise<TODO: finish>
 *
 * NOTE: These functions return response-friendly objects,
 *  so to get the return value, get it from
 *  `<ret_obj>.res.body`
 */

// --- Search ---
export { getRelatedRoots } from "./puppeteer/google/getRelatedRoots";
export { getRelatedSites } from "./puppeteer/google/getRelatedSites";

// --- Get Page ---
export { getPages } from "./puppeteer/crawl/getPages";

// --- Analyze ---
export { analyzeString } from "./watson/tone/analyzeString";
