'use strict';

module.exports = {
  /**
   * Secret use by express for his session
   */
  secret: 'hello-world',

  /**
   * Store use by express for saving his session
   */
  store: null,

  /**
   * Extras options pass to express session middleware
   */
  options: {}
};
