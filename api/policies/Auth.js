import Policy from 'trails/policy';

export default class AuthPolicy extends Policy {
  checkUsername(req, res, next) {
    next();
  }
}
