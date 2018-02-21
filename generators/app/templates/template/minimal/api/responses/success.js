import _ from 'lodash';

module.exports = function success(payload, message) {
  if (!message) {
    if (_.isString(payload)) {
      return this.json({
        message: payload
      });
    }
    message = 'Response successful';
  }
  return this.json({
    message,
    payload
  });
};
