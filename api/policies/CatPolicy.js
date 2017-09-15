import Policy from 'trails/policy';

export default class CatPolicy extends Policy {
  validCat(req, res, next) {
    next();
  }
}
