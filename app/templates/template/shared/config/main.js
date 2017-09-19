import path from 'path';

export default {

  packs: [
    require('trailpack-repl'),
    require('trailpack-router'),
    require('trailpack-express'),
    require('trailpack-waterline'),
    require('trailpack-footprints'),
    require('trailpack-swagger')
  ],

  paths: {
    root: path.resolve(__dirname, '..'),
    temp: path.resolve(__dirname, '..', '.tmp')
  }
};
