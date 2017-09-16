import Controller from 'trails/controller';

export default class AuthController extends Controller {
  create(req, res, next) {
    const s = this.app.services;
    return s.CatService.create(req.body).then((cat) => {
      return res.success(cat);
    }).catch(next);
  }

  update(req, res, next) {
    const s = this.app.services;
    return s.CatService.update(req.body).then((cat) => {
      return res.success(cat);
    }).catch(next);
  }

  findOne(req, res, next) {
    const s = this.app.services;
    return s.CatService.findOne(req.query).then((cat) => {
      return res.success(cat);
    }).catch(next);
  }

  find(req, res, next) {
    const s = this.app.services;
    return s.CatService.find(req.query).then((cats) => {
      return res.success(cats);
    }).catch(next);
  }

  delete(req, res, next) {
    const s = this.app.services;
    return s.CatService.delete(req.body).then((cat) => {
      return res.success(cat);
    }).catch(next);
  }
}
