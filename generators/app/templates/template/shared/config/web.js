import bodyParser from 'body-parser';
import express from 'express';
import expressCustomResponse from 'express-custom-response';
import path from 'path';
import { addYears, format } from 'date-fns';

expressCustomResponse(path.resolve(__dirname, '..', 'api', 'responses'));

const { env } = process;

export default {
  express,

  cors: {
    origin: 'http://example.com',
    optionsSuccessStatus: 200
  },

  init: app => {
    app.log.info('app started');
  },

  middlewares: {
    order: [
      'addMethods',
      'cookieParser',
      'session',
      'bodyParser',
      'compression',
      'methodOverride',
      'www',
      'router',
      '404',
      'errorHandler'
    ],
    bodyParser: [bodyParser.json(), bodyParser.urlencoded({ extended: false })],
    errorHandler(err, req, res, __) {
      if (err) return res.error(err);
      return res.error(new Error('Unknown error'));
    }
  },

  cache: format(addYears(0, 1), 'x'),

  port: env.PORT || 3000,

  host: env.HOST || '0.0.0.0',

  redirectToHttps: false
};
