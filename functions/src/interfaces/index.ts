// Puppeteer
export interface PInput extends Element {
  value: string;
}

export interface HTMLRet {
  [url: string]: string;
}

export interface SitesByRoot {
  [root: string]: string[];
}

// General
export interface ErrorReturn {
  success: false;
  err: string;
}

export interface UserErrorReturn {
  success: false;
  userError: string;
}

export interface SuccessReturn {
  success: true;
  res: {
    message: string;
    body: any;
  };
}