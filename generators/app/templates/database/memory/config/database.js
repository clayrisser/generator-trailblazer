import sailsMemory from 'sails-memory';

export default {
  stores: {
    memory: {
      adapter: sailsMemory
    }
  },
  models: {
    defaultStore: 'memory',
    migrate: 'safe'
  }
};
