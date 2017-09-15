import winston from 'winston';

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
