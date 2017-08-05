const env = process.env;

export default {

  local: {
    usernameField: 'username',
    passwordField: 'password'
  },

  github: {
    clientId: env.GITHUB_CLIENT_ID || '3d62ecb18190c4585fb0',
    clientSecret: env.GITHUB_CLIENT_SECRET || '965323453efc86ca2575069819ccb1b8e9dc99fd',
    callbackUrl: env.GITHUB_CALLBACK || 'http://localhost:8802/api/v1/auth/callback/github',
    scope: 'user:email'
  },

  facebook: {
    clientId: env.FACEBOOK_CLIENT_ID || '235206996927137',
    clientSecret: env.FACEBOOK_CLIENT_SECRET || '613d374ae7514e0fa5e2740d2c57d5b9',
    callbackUrl: env.FACEBOOK_CALLBACK || 'http://localhost:8802/api/v1/auth/callback/facebook',
    scope: [
      'email',
      'user_about_me'
    ],
    profileFields: [
      'email',
      'name'
    ]
  }
};
