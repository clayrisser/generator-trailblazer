import log from '../../config/log';

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
