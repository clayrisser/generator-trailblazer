'use strict';

const assert = require('assert');

describe('User Model', () => {
  it('should exist', () => {
    assert(global.app.models.User);
  });
});
