export default {
  development: require('./development').default,
  staging: require('./staging').default,
  production: require('./production').default,
  testing: require('./testing').default
};
