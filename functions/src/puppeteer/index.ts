import * as functions from "firebase-functions";
import { UserErrorReturn } from "../interfaces";
import { respond, userError } from "../function-utils";
import {
  getRelatedRoots as _getRelatedRoots,
  getRelatedSites as _getRelatedSites
} from "./google";
import { getPages as _getPages } from "./crawl";

const validateQuery = (query: string | null): UserErrorReturn | false => {
  if (!query) {
    // TODO: better validation
    return userError("Missing query param `query`");
  }
  return false;
};

const validateSites = (sites: string[] | null): UserErrorReturn | false => {
  if (false) {
    // TODO: better validation
    return userError(
      `Something's wrong with your sites: ${JSON.stringify(sites)}`
    );
  }
  return false;
};

const validateURLs = (urls: string[] | null): UserErrorReturn | false => {
  if (typeof urls === "string" || urls === null || urls.length === 0) {
    // TODO: better validation
    return userError(
      `Query param "urls[]" is not an array, urls: ${JSON.stringify(urls)}`
    );
  }
  return false;
};

// Get Related Roots to Query
const getRelatedRoots = functions.https.onRequest(
  async (req: functions.Request, res: functions.Response) => {
    const query: string = req.query.query;

    // Validate, TODO: Update with better validation
    const invalidQuery = validateQuery(query);
    if (invalidQuery) {
      respond(res, invalidQuery);
    } else {
      respond(res, await _getRelatedRoots(query));
    }
  }
);

const getRelatedSites = functions.https.onRequest(
  async (req: functions.Request, res: functions.Response) => {
    const query: string = req.query.query;
    const sites: string[] = req.query.sites;

    const invalidQuery = validateQuery(query);
    const invalidSites = validateSites(sites);

    if (invalidQuery) {
      respond(res, invalidQuery);
    } else if (invalidSites) {
      respond(res, invalidSites);
    } else {
      respond(res, await _getRelatedSites(query, sites));
    }
  }
);

const getPages = functions.https.onRequest(
  async (req: functions.Request, res: functions.Response) => {
    const urls: string[] = req.query.urls;

    const invalidUrls = validateURLs(urls);

    if (invalidUrls) {
      respond(res, invalidUrls);
    } else {
      respond(res, await _getPages(urls));
    }
  }
);

export { getRelatedRoots, getRelatedSites, getPages };
