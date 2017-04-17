/**
 * Database Configuration
 * (app.config.database)
 *
 * Configure the ORM layer, connections, etc.
 *
 * @see {@link http://trailsjs.io/doc/config/database}
 */

'use strict';

module.exports = {
  stores: {
    dev: {
      adapter: require('sails-mongo'),
      host: process.env.MONGO_HOST ? process.env.MONGO_HOST : 'localhost',
      port: process.env.MONGO_PORT ? process.env.MONGO_PORT : 27017,
      database: process.env.MONGO_DATABASE ? process.env.MONGO_DATABASE : 'trails'
    }
  },

  models: {
    defaultStore: 'dev',
    migrate: 'alter'
  }
};
