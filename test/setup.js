import TrailsApp from 'trails';

before(() => {
  global.app = new TrailsApp(require('../').default);
  return global.app.start().catch(global.app.stop);
});

after(() => {
  return global.app.stop();
});
