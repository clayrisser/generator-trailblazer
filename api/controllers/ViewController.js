'use strict';

const Controller = require('trails/controller');

module.exports = class ViewController extends Controller {
  helloWorld(req, res) {
    return res.success('Hello Trails.js !');
  }
};
