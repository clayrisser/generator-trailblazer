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
   * Render the login view
   */
  {
    method: 'GET',
    path: '/login',
    handler: 'AuthController.login'
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
  },

  {
    method: 'GET',
    path: '/api/v1/auth/provider/{provider}',
    handler: 'AuthController.provider'
  },

  {
    method: 'GET',
    path: '/api/v1/auth/callback/{provider}',
    handler: 'AuthController.callback'
  },

  {
    method: 'GET',
    path: '/api/v1/auth/get-token',
    handler: 'AuthController.getToken'
  }
];
