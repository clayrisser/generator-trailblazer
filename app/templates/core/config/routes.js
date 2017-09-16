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
  },

  /**
   * Cat Routes
   */
  {
    method: 'POST',
    path: '/api/v1/cat',
    handler: 'CatController.create'
  },
  {
    method: 'PUT',
    path: '/api/v1/cat',
    handler: 'CatController.update'
  },
  {
    method: 'GET',
    path: '/api/v1/cat',
    handler: 'CatController.findOne'
  },
  {
    method: 'GET',
    path: '/api/v1/cats',
    handler: 'CatController.find'
  },
  {
    method: 'DELETE',
    path: '/api/v1/cat',
    handler: 'CatController.update'
  }
];
