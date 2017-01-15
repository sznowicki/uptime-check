const Curl = require('node-libcurl').Curl;
const headerParser = require('header-parse');
const HTTPCodesToLang = require('../lang/http-codes-to-lang');
/**
 * Makes curl request and prepares
 * result data.
 *
 * @param options
 * @return {Promise}
 */
function makeRequest(options) {
  return new Promise((resolve, reject) => {
    const curl = new Curl();
    const codesToLang = new HTTPCodesToLang(options.timeout);

    setCurlOpts(curl, options);

    curl.on('error', (err, errorCode) => {
      curl.close();
      return reject(err);
    });

    curl.on('end', (status, responseRaw, headerRaw) => {
      let result;
      try {
        const responseString = responseRaw.toString();
        result = {
          httpCode: curl.getInfo('RESPONSE_CODE'),
          httpCodeLang: codesToLang.toLang(curl.getInfo('RESPONSE_CODE')),
          totalTime: curl.getInfo('TOTAL_TIME'),
          nameLookupTime: curl.getInfo('NAMELOOKUP_TIME'),
          connectTime: curl.getInfo('CONNECT_TIME'),
          preTransferTime: curl.getInfo('PRETRANSFER_TIME'),
          startTransferTime: curl.getInfo('STARTTRANSFER_TIME'),
          effectiveUrl: curl.getInfo('EFFECTIVE_URL'),
          redirectsCount: curl.getInfo('REDIRECT_COUNT')
        };
        curl.close();

        result.headerSize = headerRaw.toString().length;
        const bodySize = responseString.length - result.headerSize;
        const header = responseString.slice(0, result.headerSize);
        const body = responseString.slice(result.headerSize, bodySize);

        result.bodySize = bodySize;
        result.header = header;
        result.body = body;
        result.response = responseString;
        result.headersParsed = headerParser.parseHeaders(result.header);
      } catch (err) {
        curl.close();
        return reject(err);
      }

      return resolve(result);
    });
    curl.perform();
  });
}

function setCurlOpts(curl, options) {
  /* features */
  curl.enable(Curl.feature.RAW);
  /* dynamic */
  curl.setOpt('URL', options.url);
  curl.setOpt('FOLLOWLOCATION', options.redirectsLimit ? 1 : 0);
  curl.setOpt('MAXREDIRS', options.redirectsLimit);
  curl.setOpt('USERAGENT', options.userAgent);
  curl.setOpt('CONNECTTIMEOUT', options.timeOut);
  curl.setOpt('TIMEOUT', options.timeOut * 3);

  /* static */
  curl.setOpt('HEADER', 1);
  curl.setOpt('VERBOSE', false);
  curl.setOpt('CUSTOMREQUEST', 'GET');
}

module.exports = makeRequest;
