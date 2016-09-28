'use strict';

const assert = require('assert');
const eventCreator = require('../../../../src/services/event/hooks/eventCreator.js');

describe('event eventCreator hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'before',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    eventCreator()(mockHook);

    assert.ok(mockHook.eventCreator);
  });
});
