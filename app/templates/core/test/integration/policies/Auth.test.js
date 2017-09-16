import assert from 'assert';

describe('Auth', () => {
  it('should exist', () => {
    assert(global.app.policies.AuthPolicy);
  });
});
