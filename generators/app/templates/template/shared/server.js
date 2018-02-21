import Trails from 'trails';
import app from './';

const server = new Trails(app);

server.start().catch(err => server.stop(err));
