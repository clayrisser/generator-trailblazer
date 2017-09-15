export default [
  /**
   * Default Routes
   */
  {
    method: 'GET',
    path: '/',
    handler: 'DefaultController.api'
  },
  {
    method: 'GET',
    path: '/api',
    handler: 'DefaultController.api'
  },
  {
    method: 'GET',
    path: '/api/v1',
    handler: 'DefaultController.v1'
  },
  {
    method: 'GET',
    path: '/api/v1/info',
    handler: 'DefaultController.info',
    config: {
      plugins: {
        swagger: {
          description: 'Return some info about this application'
        }
      }
    }
  }

  /**
   * Cat Routes
   */
];
