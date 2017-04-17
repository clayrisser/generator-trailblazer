'use strict';

const Controller = require('trails/controller');
const checkParams = require('check-params');
const access = require('safe-access');

/**
 * @module AuthController
 *
 * @description Authentication Controller
 */
module.exports = class AuthController extends Controller {

  provider(req, res) {
    const s = this.app.services;
    return checkParams(req, {
      urlParams: [
        'provider'
      ]
    }).then((message) => {
      return s.AuthService.provider(req, res, req.params.provider);
    }).catch((err) => res.error(err));
  }

  callback(req, res) {
    const s = this.app.services;
    return checkParams(req, {
      urlParams: [
        'provider'
      ]
    }).then((message) => {
      return s.AuthService.callback(req, req.params.provider).then((user) => {
        return res.success(user, 'Login successful');
      });
    }).catch((err) => res.error(err));
  }

  getToken(req, res) {
    const s = this.app.services;
    return s.AuthService.getToken(access(req, 'session.user')).then((data) => {
      return res.success(data, 'User is logged in');
    }).catch((err) => res.error(err));
  }
};
