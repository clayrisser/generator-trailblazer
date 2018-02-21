import path from 'path';
import trailpackExpress from 'trailpack-express';
import trailpackFootprints from 'trailpack-footprints';
import trailpackRepl from 'trailpack-repl';
import trailpackRouter from 'trailpack-router';
import trailpackWaterline from 'trailpack-waterline';

export default {
  packs: [
    trailpackRouter,
    trailpackRepl,
    trailpackExpress,
    trailpackWaterline,
    trailpackFootprints
  ],
  paths: {
    root: path.resolve(__dirname, '..'),
    temp: path.resolve(__dirname, '..', '.tmp'),
    www: path.resolve(__dirname, '..', 'public')
  }
};
