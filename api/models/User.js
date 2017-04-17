'use strict';

const Model = require('trails/model');

/**
 * @module User
 * @description TODO document Model
 */
module.exports = class User extends Model {

  static config () {

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
};
