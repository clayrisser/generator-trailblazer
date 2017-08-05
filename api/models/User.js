import Model from 'trails/model';

export default class User extends Model {

  static config () {
    return;
  }

  static schema () {
    return {
      userName: {
        type: 'string',
        required: true
      },
      firstName: {
        type: 'string',
        required: true
      },
      lastName: 'string',
      displayName: {
        type: 'string',
        required: true
      },
      email: {
        type: 'string',
        required: true
      },
      phoneNumber: 'integer',
      roles: {
        type: 'array',
        defaultsTo: ['customer'],
        required: true
      },
      applications: {
        type: 'array',
        defaultsTo: []
      },
      password: 'string',
      githubId: 'string',
      facebookId: 'string'
    };
  }
}
