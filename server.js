/**
 * @module server
 *
 * Start up the Trails Application.
 */

'use strict';

require('express-custom-response')(__dirname + '/api/responses');

const TrailsApp = require('trails');
const app = require('./');
const server = new TrailsApp(app);

server.start().then((app) => {
  app.services.PassportService.init();
}).catch(err => server.stop(err));
