export default [
  {
    method: 'GET',
    path: '/',
    handler: 'DefaultController.info'
  },
  {
    method: 'GET',
    path: '/api',
    handler: 'DefaultController.info'
  },
  {
    method: 'GET',
    path: '/api/v1',
    handler: 'DefaultController.info'
  },
  {
    method: 'GET',
    path: '/api/v1/info',
    handler: 'DefaultController.info'
  }
];
