'use strict';

const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const Service = require('trails/service');
const passport = require('passport');
const changeCase = require('change-case');

/**
 * @module PassportService
 *
 * @description Passport Service
 */
module.exports = class AuthService extends Service {

  init() {
    const c = this.app.config;
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
      profileFields: [
        'email',
        'name'
      ]
    }, this.facebook));
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
      displayName: data.displayName,
      email: data.email,
      providerId: data.providerId
    };
    if (data.lastName) properties.lastName = data.lastName;
    return properties;
  }

  findUpdateOrCreate(properties, providerIdName) {
    const o = this.app.orm;
    properties[providerIdName] = properties.providerId;
    delete properties.providerId;
    return o.User.findOne({email: properties.email})
      .then(function(user) {
        if (user) {
          if (user[providerIdName]) { // find
            return user;
          } else { // update
            return new Promise(function(resolve, reject) {
              user[providerIdName] = properties[providerIdName];
              user.save(function(err) {
                if (err) reject(err);
                resolve(user);
              });
            });
          }
        } else { // create
          return o.User.create(properties);
        }
      });
  }
};
