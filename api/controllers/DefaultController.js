import Controller from 'trails/controller';

export default class DefaultController extends Controller {

  info(req, res, next) {
    return this.app.services.DefaultService.getApplicationInfo().then((data) => {
      res.success(data);
    }).catch(next);
  }

  api(req, res, next) {
    return res.json('Hello Trailblazer!');
  }

  v1(req, res, next) {
    return res.json('Hello Trailblazer v1!');
  }
}
