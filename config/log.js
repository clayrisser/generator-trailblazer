import winston from 'winston';

/**
 * Specify the logger to use.
 * @see https://github.com/winstonjs/winston#instantiating-your-own-logger
 *
 * Exposed on app.log
 */
export const logger = new winston.Logger({
  level: 'info',
  exitOnError: false,
  transports: [
    new (winston.transports.Console)({
      prettyPrint: true,
      colorize: true
    })
  ]
});
