import Service from 'trails/service';
import boom from 'boom';
import _ from 'lodash';

export default class CatService extends Service {
  create(payload) {
    const o = this.app.orm;
    return o.Cat.create(payload);
  }

  update(payload) {
    const o = this.app.orm;
    return o.Cat.update(payload);
  }

  findOne(payload) {
    if (_.keys(payload).length <= 0) throw boom.badRequest('Cat not specified');
    const o = this.app.orm;
    return o.Cat.findOne(payload).then((cat) => {
      if (!cat) throw boom.notFound('Cat not found');
      return cat;
    });
  }

  find(payload) {
    const o = this.app.orm;
    return o.Cat.find(payload);
  }

  delete(payload) {
    const o = this.app.orm;
    return o.Cat.delete(payload);
  }
}
