/**
  * api/responses/success.js
  *
  * Handles success in a clean way
 */

var _ = require('lodash');

module.exports = function(data, message) {
  if (!message) {
    if (_.isString(data)) {
      return this.json({
        message: data
      });
    }
    message = 'Response successful';
  }
  return this.json({
    message: message,
    data: data
  });
};
