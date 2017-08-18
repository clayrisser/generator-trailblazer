import Service from 'trails/service';
import passport from 'passport';
import changeCase from 'change-case';
import bCrypt from 'bcrypt-nodejs';
import boom from 'boom';

const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;

export default class AuthService extends Service {

  init() {
    const c = this.app.config;
    passport.use('signup', new LocalStrategy({
      passReqToCallback: true,
      usernameField: c.providers.local.usernameField,
      passwordField: c.providers.local.passwordField
    }, this.signup));
    passport.use('login', new LocalStrategy({
      passReqToCallback: true,
      usernameField: c.providers.local.usernameField,
      passwordField: c.providers.local.passwordField
    }, this.login));
    passport.use(new JwtStrategy({
      secretOrKey: c.main.jwtSecret,
      jwtFromRequest: (req) => {
        return req.jwt.token;
      }
    }, this.jwt));
    passport.use(new GitHubStrategy({
      clientID: c.providers.github.clientId,
      clientSecret: c.providers.github.clientSecret,
      callbackURL: c.providers.github.callbackUrl,
      scope: c.providers.github.scope
    }, this.github));
    passport.use(new FacebookStrategy({
      clientID: c.providers.facebook.clientId,
      clientSecret: c.providers.facebook.clientSecret,
      callbackURL: c.providers.facebook.callbackUrl,
      profileFields: c.providers.facebook.profileFields
    }, this.facebook));
  }

  signup(req, userName, password, cb) {
    const o = this.app.orm;
    const email = req.body.email;
    const properties = this.generateProperties({
      userName: userName,
      firstName: userName,
      lastName: false,
      displayName: userName,
      email: email,
      providerId: false
    });
    properties.password = bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    return o.User.findOne({email: email}).then((user) => {
      if (user) {
        if (user.password && user.password.length > 0) {
          throw boom.badRequest(`The email '${email}' is already taken`, {
            email: email
          });
        } else {
          return this.updatePassword(user, properties.password);
        }
      } else {
        return o.User.findOne({userName: userName}).then((user) => {
          if (user) {
            if (user.password && user.password.length > 0) {
              throw boom.badRequest(`The username '${userName}' is already taken`, {
                userName: userName
              });
            } else {
              return this.updatePassword(user, properties.password);
            }
          } else {
            return o.User.create(properties).then((user) => {
              return user;
            });
          }
        });
      }
    }).then(user => cb(null, user)).catch(err => cb(err, null));
  }

  login(req, userName, password, cb) {
    const o = this.app.orm;
    return o.User.findOne({userName: userName}).then((user) => {
      if (!user) {
        return o.User.findOne({email: userName}).then((user) => {
          if (!user) throw boom.notFound(`No account exists for '${userName}'`, {
            userName: userName
          });
          return user;
        });
      }
      return user;
    }).then((user) => {
      if (!user.password) throw boom.badRequest('Password not set');
      const valid = bCrypt.compareSync(password, user.password);
      if (!valid) throw boom.badRequest('Incorrect password');
      return cb(null, user);
    }).catch(err => cb(err, null));
  }

  jwt(payload, cb) {
    return null;
  }

  github(accessToken, refreshToken, profile, cb) {
    const properties = this.generateProperties({
      userName: profile.username,
      firstName: false,
      lastName: false,
      displayName: profile.displayName,
      email: profile.emails[0].value,
      providerId: profile.id
    });
    return this.findUpdateOrCreate(properties, 'githubId').then((user) => {
      return cb(null, user);
    }).catch(err => cb(err, null));
  }

  facebook(accessToken, refreshToken, profile, cb) {
    const properties = this.generateProperties({
      userName: false,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      displayName: false,
      email: profile.emails[0].value,
      providerId: profile.id
    });
    return this.findUpdateOrCreate(properties, 'facebookId').then((user) => {
      return cb(null, user);
    }).catch(err => cb(err, null));
  }

  generateProperties(data) {
    if (!data.firstName) {
      if (data.displayName.indexOf(' ') > -1) {
        data.firstName = data.displayName.substr(0, data.displayName.indexOf(' '));
        if (!data.lastName) {
          data.lastName = data.displayName.substr(
            data.displayName.indexOf(' '),
            data.displayName.length
          );
        }
      } else {
        data.firstName = data.displayName;
      }
    } else if (!data.displayName) {
      if (data.lastName) {
        data.displayName = data.firstName + ' ' + data.lastName;
      } else {
        data.displayName = data.firstName;
      }
    }
    if (!data.userName) {
      data.userName = changeCase.paramCase(data.displayName);
    }
    const properties = {
      userName: data.userName,
      firstName: data.firstName,
      displayName: data.displayName
    };
    if (data.email) properties.email = data.email;
    if (data.providerId) properties.providerId = data.providerId;
    if (data.lastName) properties.lastName = data.lastName;
    return properties;
  }

  findUpdateOrCreate(properties, providerIdName) {
    const o = this.app.orm;
    properties[providerIdName] = properties.providerId;
    delete properties.providerId;
    const query = {};
    query[providerIdName] = properties[providerIdName];
    return o.User.findOne(query).then((user) => { // find by providerId
      if (user) return user;
      return o.User.findOne({email: properties.email})
        .then((user) => { // find by email
          if (user) {
            if (user[providerIdName]) {
              return user;
            } else { // attach providerId
              return new Promise((resolve, reject) => {
                user[providerIdName] = properties[providerIdName];
                user.save(function(err) {
                  if (err) reject(err);
                  resolve(user);
                });
              });
            }
          } else { // create new user
            return o.User.create(properties);
          }
        });
    });
  }

  updatePassword(user, password) {
    return new Promise((resolve, reject) => {
      user.password = password;
      user.save((err) => {
        if (err) return reject(err);
        return resolve(user);
      });
    });
  }
}
