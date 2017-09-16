import TrailsApp from 'trails';
import app from './';

require('express-custom-response')(__dirname + '/api/responses');

const server = new TrailsApp(app);

server.start().then((app) => {
}).catch(err => server.stop(err));
