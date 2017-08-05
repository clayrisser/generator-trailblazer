import Controller from 'trails/controller';
import access from 'safe-access';

export default class AuthController extends Controller {

  register(req, res, next) {
    const s = this.app.services;
    return s.AuthService.register(req).then((user) => {
      return s.AuthService.getToken(user).then((context) => {
        return res.success(context);
      });
    }).catch(next);
  }

  login(req, res, next) {
    const s = this.app.services;
    return s.AuthService.login(req).then((user) => {
      return s.AuthService.getToken(user).then((context) => {
        return res.success(context);
      });
    }).catch(next);
  }

  provider(req, res, next) {
    const s = this.app.services;
    return s.AuthService.provider(req, res, req.params.provider).catch(next);
  }

  callback(req, res, next) {
    const s = this.app.services;
    return s.AuthService.callback(req, req.params.provider).then((user) => {
      return s.AuthService.getToken(user).then((context) => {
        return res.render('callback.ejs', {
          context: context
        });
      });
    }).catch(next);
  }

  getToken(req, res, next) {
    const s = this.app.services;
    return s.AuthService.getToken(access(req, 'session.user')).then((context) => {
      return res.success(context, 'User is logged in');
    }).catch(next);
  }
}
