import assert from 'assert';

describe('User Model', () => {
  it('should exist', () => {
    assert(global.app.models.User);
  });
});
