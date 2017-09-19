export default {
  stores: {
    mongo: {
      adapter: require('sails-mongo'),
      host: process.env.MONGO_HOST ? process.env.MONGO_HOST : 'localhost',
      port: process.env.MONGO_PORT ? process.env.MONGO_PORT : 27017,
      database: process.env.MONGO_DATABASE ? process.env.MONGO_DATABASE : '<%= name %>'
    }
  },

  models: {
    defaultStore: 'mongo',
    migrate: 'safe'
  }
};
