import winston from 'winston';

export default {
  logger: new winston.Logger({
    level: 'info',
    exitOnError: false,
    transports: [
      new winston.transports.Console({
        prettyPrint: true,
        colorize: true
      })
    ]
  })
};
