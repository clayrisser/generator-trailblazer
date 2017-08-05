export default {
  stores: {
    mongo: {
      adapter: require('sails-mongo'),
      host: process.env.MONGO_HOST || 'localhost',
      port: process.env.MONGO_PORT || 27017,
      database: process.env.MONGO_DATABASE || 'trailblazer'
    }
  },

  models: {
    defaultStore: 'mongo',
    migrate: 'alter'
  }
};
