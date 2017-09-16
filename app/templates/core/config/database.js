export default {
  stores: {
    memory: {
      adapter: require('sails-memory')
    }
  },

  models: {
    defaultStore: 'memory',
    migrate: 'safe'
  }
};
