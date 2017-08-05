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

  {
    method: 'POST',
    path: '/api/v1/auth/register',
    handler: 'AuthController.register'
  },

  {
    method: 'GET',
    path: '/api/v1/auth/login',
    handler: 'AuthController.login'
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
