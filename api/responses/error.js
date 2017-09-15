import access from 'safe-access';
import { logger as log } from '../../config/log';

module.exports = (err, verbose) => {
  let code = 500;
  const statusCode = access(err, 'output.statusCode');
  verbose = false;
  if (statusCode && (100 <= statusCode && statusCode < 600)) code = Number(statusCode);
  log.transports.console.label = code;
  if (code >= 500) {
    log.error(err);
  } else if (process.env.NODE_ENV !== 'production') {
    if (verbose) {
      log.warn(err);
    } else {
      log.warn(err.message);
    }
  }
  const response = { message: err.message };
  if (err.data) response.payload = err.data;
  return this.status(code).json(response);
};
