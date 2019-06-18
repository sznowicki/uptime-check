const curlRequest = require('./tasks/request');

/**
 *
 * @param {Object} opts
 * @returns {Promise}
 */
function check(opts) {
  return new Promise((resolve, reject) => {
    const options = mergeDefaults(opts);
    try {
      validateOptions(options)
    } catch (err) {
      return reject(err);
    }

    curlRequest(options)
      .then(result => {
        const httpCode = result.httpCode;

        result.status = (httpCode >= 200 && httpCode < 300);
        if (result.status && options.keyword) {
          result.status = result.body.indexOf(options.keyword) > -1;
        }

        return resolve(result);
      })
      .catch(err => {
        return reject(err);
      })
  });
}

/**
 * Validates options. Throws Error if something is wrong.
 *
 * @param {Object} opts
 * @throws Error
 */
function validateOptions(opts) {
  const keysRequired = [
    'url'
  ];
  const numbers = [
    'redirectsLimit',
    'timeOut'
  ];
  const strings = [
    'keyword',
    'url'
  ];
  keysRequired.forEach(key => {
    if (!opts.hasOwnProperty(key)) {
      throw new Error(`Missing required option: ${key}`);
    }
  });
  numbers.forEach(key => {
    if (typeof opts[key] !== 'number' || parseInt(opts[key]) !== opts[key]) {
      throw new Error(`Invalid option: ${key} must be an integer number`);
    }
  });

  strings.forEach(key => {
    if (opts[key] && typeof opts[key] !== 'string') {
      throw new Error(`Invalid option: ${key} must be a string.`);
    }
 });
 }
 /**
 * Merges options with defaults.
 * @param {Object} opts
 * @returns {Object}
 */
function mergeDefaults(opts) {
  const defaults = {
    keyword: null,
    redirectsLimit: 3,
    userAgent: 'Generic curl robot',
    timeOut: 10
  };

  return Object.assign({}, defaults, opts);
}

module.exports = check;
