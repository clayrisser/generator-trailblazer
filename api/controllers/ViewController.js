'use strict';

const Controller = require('trails/controller');

/**
 * @module ViewController
 *
 * @description View Controller for rendering views
 */
module.exports = class ViewController extends Controller {

  helloWorld(req, res) {
    return res.success('Hello Trailblazer!');
  }
};
