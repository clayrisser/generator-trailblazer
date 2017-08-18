import Service from 'trails/service';
import _ from 'lodash';
import moment from 'moment';
import jwt from 'jwt-simple';
import passport from 'passport';
import boom from 'boom';

export default class AuthService extends Service {

  register(req) {
    return new Promise((resolve, reject) => {
      passport.authenticate('signup', (err, user) => {
        if (err) return reject(err);
        req.session.user = user;
        return resolve(user);
      })(req);
    });
  }

  login(req) {
    return new Promise((resolve, reject) => {
      passport.authenticate('login', (err, user) => {
        if (err) return reject(err);
        req.session.user = user;
        return resolve(user);
      })(req);
    });
  }

  provider(req, res, provider) {
    const c = this.app.config;
    return new Promise((resolve, reject) => {
      if (_.includes(_.keys(c.providers), provider) && provider !== 'local') {
        passport.authenticate(provider, {
          scope: c.providers[provider].scope
        })(req, res);
      } else {
        reject(boom.badRequest(`${provider} is an invalid provider`, { provider }));
      }
    });
  }

  callback(req, provider) {
    const c = this.app.config;
    return new Promise(function(resolve, reject) {
      if (_.includes(_.keys(c.providers), provider)) {
        passport.authenticate(provider, (err, user) => {
          if (err) return reject(err);
          req.session.user = user;
          return resolve(user);
        })(req);
      } else {
        reject(boom.badRequest(`${provider} is an invalid callback`, { provider }));
      }
    });
  }

  generateToken(user) {
    const c = this.app.config;
    const payload = {
      userId: user.id,
      exp: moment().add(5, 'hours').unix()
    };
    return jwt.encode(payload, c.main.jwtSecret);
  }

  getToken(user) {
    if (!user) return Promise.reject(boom.unauthorized('user not logged in'));
    return Promise.resolve({
      user: user,
      token: this.generateToken(user)
    });
  }
}
