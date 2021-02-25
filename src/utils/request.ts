class APIError {
  errors: any;
  status?: number;

  constructor(error: any) {
    this.errors = error?.errors;
    this.status = error.status;
  }
}

async function checkStatus(response: any) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const errorResp = await response.json();
  const error = new APIError(errorResp);

  throw error;
}

function parseJSON(response: any) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }

  return response.json();
}

export function isFetchCanceled(err: any) {
  if (err.code === 20) {
    return true;
  }

  return false;
}

let abortCache: any = {};

export default async function request(url: string, opts?: any) {
  let result = null;

  if (opts?.effects) {
    // Handle side effects.
    if (opts.effects.takeLast) {
      let abortController = abortCache[opts.effects.takeLast];

      // Only the last requested response of the same id will be handled.
      // Otherwise, an abort error of code 20 will be thrown.
      if (abortController) {
        abortController.abort();
      }

      abortController = abortCache[
        opts.effects.takeLast
      ] = new AbortController();
      opts.signal = abortController.signal;
    }
  }

  const fetchResp = await fetch(url, opts);
  const checkedResp = await checkStatus(fetchResp);
  // default to json for this
  if (checkedResp) {
    result = await parseJSON(checkedResp);
    delete abortCache[opts.effects.takeLast];
  }

  return result;
}
