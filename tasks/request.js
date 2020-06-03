const got = require('got');
const HTTPCodesToLang = require('../lang/http-codes-to-lang');

const makeOptions = (options) => ({
  method: 'get',
  url: options.url,
  followRedirect: options.redirectsLimit > 0,
  maxRedirects: options.redirectsLimit,
  timeout: options.timeOut * 1000,
  headers: {
    'User-Agent': options.userAgent,
  }
});

const makeResponse = async (options) => {
  try {
    return await got(makeOptions(options))
  } catch (error) {
    if (error.response) {
      return error.response;
    }

    throw error;
  }
};

/**
 * Makes curl request and prepares
 * result data.
 *
 * @param options
 * @return {Promise}
 */
const makeRequest = async (options) => {
  const now = Date.now();
  const codesToLang = new HTTPCodesToLang(options.timeOut);
  const response = await makeResponse(options);
  const totalTime = (Date.now() - now) / 1000;

  const result = {
    httpCode: response.statusCode,
    httpCodeLang: codesToLang.toLang(response.statusCode),
    totalTime,
    effectiveUrl: response.url,
    redirectsCount: response.request.redirects.length,
    headers: response.headers,
    body: response.body,
    bodySize: response.body.length,
  };

  return result;
}

module.exports = makeRequest;
