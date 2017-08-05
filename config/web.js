import bodyParser from 'body-parser';

export default {
  express: require('express'),

  /**
   * CORS options
   * Can be true/false or an object of CORS options
   * @see {@link https://github.com/expressjs/cors#configuring-cors}
   */
  cors: true,

  /**
   * Init method, can be used to customize express instance
   */
  init: (trailsApp, expressApp) => {
    trailsApp.log.info('app starteakfjdslkfdf');
  },

  /**
   * Middlewares to load (in order)
   */
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

    bodyParser: [
      bodyParser.json(),
      bodyParser.urlencoded({extended: false})
    ],

    errorHandler(err, req, res, next) {
      if (err) return res.error(err);
      return res.error(new Error('Unknown error'));
    }
  },

  /***************************************************************************
   *                                                                          *
   * The number of seconds to cache flat files on disk being served by        *
   * Express static middleware (by default, these files are in `.tmp/public`) *
   *                                                                          *
   * The HTTP static cache is only active in a 'production' environment,      *
   * since that's the only time Express will cache flat-files.                *
   *                                                                          *
   ***************************************************************************/

  cache: 31557600000,

  /**
   * The host to bind the web server to
   */
  //host: process.env.HOST || 'localhost',

  /**
   * The port to bind the web server to
   */
  port: process.env.PORT || 8802,

  /**
   * The host to bind the web server to
   */
  host: process.env.HOST || '0.0.0.0'

  /**
   * Alternate method to add multiple template engine, for single view template use config.views.engine
   */
  /*
  views: {
    engines: {
      // html: require('some-view-engine')
    },
    path: 'views'
  },
  */

  /**
   * SSL options
   * Cert and key or pfx to create HTTPS server
   */
  /*
  ssl: {
    key: fs.readFileSync('path/to/private.key'),
    cert: fs.readFileSync('path/to/certificate.pem')
    //OR pfx: fs.readFileSync('path/to/server.pfx')
  },
   */
  /**
   * Automatically redirect HTTP to HTTPS
   * Create an HTTP server who redirect to HTTPS server
   * Work only if SSL is enabled
   */
  //redirectToHttps: false,

  /**
   * Http port to use if you want to enable http and https
   * SSL need to be enabled
   */
  //portHttp: 80
};
