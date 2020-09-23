const request = require('./tasks/request');

/**
 * Validates options. Throws Error if something is wrong.
 *
 * @param {Object} opts
 * @throws Error
 */
const validateOptions = (opts) => {
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

  // Only http and https can be tested.
  if (opts.url.startsWith('http') === false) {
    throw new Error('Url must be http:// or https://');
  }
}

/**
 * Merges options with defaults.
 * @param {Object} opts
 * @returns {Object}
 */
const mergeDefaults = (opts) => {
  const defaults = {
    keyword: null,
    redirectsLimit: 3,
    userAgent: 'Generic curl robot',
    timeOut: 10
  };

  return Object.assign({}, defaults, opts);
}

/**
 *
 * @param {Object} opts
 * @returns {Promise}
 */
const check = async (opts) => {
  const options = mergeDefaults(opts);
  validateOptions(options)

  const result = await request(options);

  const httpCode = result.httpCode;

  result.status = (httpCode >= 200 && httpCode < 300);
  if (result.status && options.keyword) {
    result.status = result.body.indexOf(options.keyword) > -1;
  }
  return result;
}


module.exports = check;
