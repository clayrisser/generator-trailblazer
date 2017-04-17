'use strict';

const Service = require('trails/service');
const _ = require('lodash');
const jwt = require('jwt-simple');
const passport = require('passport');
const Err = require('err');

/**
 * @module AuthService
 *
 * @description Authentication Service
 */
module.exports = class AuthService extends Service {

  provider(req, res, provider) {
    const c = this.app.config;
    return new Promise((resolve, reject) => {
      if (_.includes(_.keys(c.providers), provider)) {
        passport.authenticate(provider, {
          scope: c.providers[provider].scope
        })(req, res);
      } else {
        reject(new Err(provider + ' is an invalid provider', 400));
      }
    });
  }

  callback(req, res, provider) {
    const c = this.app.config;
    return new Promise(function(resolve, reject) {
      if (_.includes(_.keys(c.providers), provider)) {
        passport.authenticate(provider, (err, user) => {
          if (err) return reject(err);
          return resolve(user);
        })(req, res);
      } else {
        reject(new Err(provider + ' is an invalid callback', 400));
      }
    });
  }

  generateToken(user) {
    const c = this.app.config;
    const payload = {
      id: user.id
    };
    return jwt.encode(payload, c.main.jwtSecret);
  }
};
