/**
 * Routes Configuration
 * (trails.config.routes)
 *
 * Configure how routes map to views and controllers.
 *
 * @see http://trailsjs.io/doc/config/routes.js
 */

'use strict';

module.exports = [

  /**
   * Render the HelloWorld view
   */
  {
    method: 'GET',
    path: '/',
    handler: 'ViewController.helloWorld'
  },

  /**
   * Return some info about this application
   */
  {
    method: 'GET',
    path: '/api/v1/default/info',
    handler: 'DefaultController.info',
    config: {
      plugins: {
        swagger: {
          description: 'Return some info about this application'
        }
      }
    }
  }
];
