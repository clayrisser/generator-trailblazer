const controllerNames = Object.keys(require('../api/controllers'));

/**
 * Footprints Configuration
 * (config.footprints)
 *
 * Footprints are routes that are auto-generated from your model and controller
 * definitions in api/controllers and api/models.
 *
 * @see http://trailsjs.io/doc/config/footprints
 */
module.exports = {

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
