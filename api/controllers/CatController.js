import Controller from 'trails/controller';

export default class AuthController extends Controller {
  create(req, res, next) {
    const s = this.app.services;
    return s.CatService.create(req.body).catch(next);
  }

  find(req, res, next) {
    const s = this.app.services;
    return s.CatService.create(req.body).catch(next);
  }

  update(req, res, next) {
    const s = this.app.services;
    return s.CatService.create(req.body).catch(next);
  }

  delete(req, res, next) {
    const s = this.app.services;
    return s.CatService.delete(req.body).catch(next);
  }
}
