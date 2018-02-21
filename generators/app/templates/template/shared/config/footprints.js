import _ from 'lodash';
import controllers from '../api/controllers';

export default {
  controllers: { ignore: _.keys(controllers) },
  models: {
    options: {
      populate: false
    },
    actions: {
      create: false,
      find: false,
      update: false,
      destroy: false,
      createAssociation: false,
      findAssociation: false,
      updateAssociation: false,
      destroyAssociation: false
    }
  },
  prefix: '/api/v1'
};
