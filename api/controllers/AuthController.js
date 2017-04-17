'use strict';

const Controller = require('trails/controller');
const checkParams = require('check-params');
const Err = require('err');

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
      return s.AuthService.callback(req, res, req.params.provider).then((user) => {
        return res.success(user, 'Login successful');
      });
    }).catch((err) => res.error(err));
  }

  getToken(req, res) {
    const s = this.app.services;
    if (!req.session.user) return res.error(new Err('user not in session', 400));
    const user = req.session.user;
    const token = s.AuthService.generateToken(user);
    return res.success({
      user: user,
      token: token
    });
  }

  authenticated(req, res) {
    if (req.jwt.authenticated) {
      return res.success({
        authenticated: true,
        user: req.jwt.user
      }, 'User is authenticated');
    } else {
      return res.success({
        authenticated: false
      }, 'User is not authenticated');
    }
  }
};
