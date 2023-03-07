const assert = require('assert');
const { config, add, get_prompt } = require('../index.js');

global.window = {};
require('mock-local-storage');
window.localStorage = global.localStorage;

describe('chat-memory', () => {
  beforeEach(() => {
    config(4096);
  });

  describe('config', () => {
    it('should throw an error if the limit is not a number', () => {
      assert.throws(() => config('invalid'), /^Error: Invalid token limit$/);
    });

    it('should throw an error if the limit is less than or equal to 0', () => {
      assert.throws(() => config(-1), /^Error: Invalid token limit$/);
      assert.throws(() => config(0), /^Error: Invalid token limit$/);
    });

    it('should set the token limit to the specified value', () => {
      config(100);
      assert.strictEqual(localStorage.getItem('tokenLimit'), '100');
    });
  });
});
