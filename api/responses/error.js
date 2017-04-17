/**
 * api/responses/error.js
 *
 * @description Handles error in a clean way
 */

const log = require('../../config/log').logger;

module.exports = function(err, verbose) {
  let code = 500;
  verbose = false;
  if (err.code && (100 <= code && code < 600)) code = Number(err.code);
  if (code >= 500) {
    log.error(err);
  } else {
    if (process.env.NODE_ENV !== 'production') {
      if (verbose) {
        log.warn(err);
      } else {
        log.warn(err.message);
      }
    }
  }
  return this.status(code).json({ message: err.message });
};
