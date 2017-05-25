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

  register(req, res) {
    const s = this.app.services;
    return checkParams(req, {
      bodyParams: [
        'username',
        'email',
        'password'
      ]
    }).then((message) => {
      return s.AuthService.register(req).then((user) => {
        return s.AuthService.getToken(user).then((context) => {
          return res.success(context);
        });
      });
    }).catch((err) => res.error(err));
  }

  login(req, res) {
    const s = this.app.services;
    return checkParams(req, {
      queryParams: [
        'password',
        'username'
      ]
    }).then((message) => {
      return s.AuthService.login(req).then((user) => {
        return s.AuthService.getToken(user).then((context) => {
          return res.success(context);
        });
      });
    }).catch((err) => res.error(err));
  }

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
        return s.AuthService.getToken(user).then((context) => {
          return res.render('callback.ejs', {
            context: context
          });
        });
      });
    }).catch((err) => res.error(err));
  }

  getToken(req, res) {
    const s = this.app.services;
    return s.AuthService.getToken(access(req, 'session.user')).then((context) => {
      return res.success(context, 'User is logged in');
    }).catch((err) => res.error(err));
  }
};
