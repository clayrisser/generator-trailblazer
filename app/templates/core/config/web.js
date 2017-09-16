import bodyParser from 'body-parser';
import _ from 'lodash';
import validator from 'express-validator';
import fileUpload from 'express-fileupload';

export default {
  express: require('express'),

  cors: {
    origin: 'http://example.com',
    optionsSuccessStatus: 200
  },

  init: (app, expressApp) => {
    app.log.info('app started');
  },

  middlewares: {
    order: [
      'addMethods',
      'cookieParser',
      'session',
      'bodyParser',
      'fileUpload',
      'validator',
      'compression',
      'methodOverride',
      'www',
      'router',
      '404',
      'errorHandler'
    ],
    bodyParser: [
      bodyParser.json(),
      bodyParser.urlencoded({ extended: false })
    ],
    validator: validator({
      customValidators: {
        isImage: (value, file) => {
          let valid = false;
          const validMimetypes = [
            'image/png',
            'image/jpeg',
            'image/gif',
            'image/bmp'
          ];
          _.each(validMimetypes, (validMimetype) => {
            if (file.mimetype === validMimetype) valid = true;
          });
          return valid;
        }
      }
    }),
    fileUpload: fileUpload({
      limits: { fileSize: 50 * 1024 * 1024 },
      safeFileNames: true,
      preserveExtension: true
    }),
    errorHandler(err, req, res, next) {
      if (err) return res.error(err);
      return res.error(new Error('Unknown error'));
    }
  },

  cache: 31557600000,

  port: process.env.PORT || 3000,

  host: process.env.HOST || '0.0.0.0',

  redirectToHttps: false

// ssl: {
//   key: fs.readFileSync('path/to/private.key'),
//   cert: fs.readFileSync('path/to/certificate.pem')
// },

//  portHttp: 80
};
