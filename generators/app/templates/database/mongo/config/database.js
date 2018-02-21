import sailsMongo from 'sails-mongo';

const { env } = process;

export default {
  stores: {
    mongo: {
      adapter: sailsMongo,
      host: env.MONGO_HOST || 'localhost',
      port: env.MONGO_PORT || 27017,
      database: env.MONGO_DATABASE || 'trailblazer'
    }
  },
  models: {
    defaultStore: 'mongo',
    migrate: 'safe'
  }
};
