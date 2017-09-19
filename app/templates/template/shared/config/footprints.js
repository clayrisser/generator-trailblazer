import _ from 'lodash';

const controllerNames = _.keys(require('../api/controllers'));

export default {

  /**
   * Generate routes for controller handlers.
   */
  controllers: { ignore: controllerNames },

  /**
   * Generate conventional Create, Read, Update, and Delete (CRUD) routes for
   * each Model.
   */
  models: {
    options: {

      /**
       * The max number of objects to return by default. Can be overridden in
       * the request using the ?limit argument.
       */
      defaultLimit: 100,

      /**
       * Whether to populate all model associations by default (for "find")
       */
      populate: false
    },

    actions: {
      create: false,
      find: false,
      update: false,
      destroy: false,

      /**
       * Specify which "association" endpoints to activate.
       */
      createAssociation: false,
      findAssociation: false,
      updateAssociation: false,
      destroyAssociation: false
    }
  },

  /**
   * Prefix your footprint routes
   */
  prefix: '/api/v1'
};
