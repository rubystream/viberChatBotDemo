/*global describe, it, expect*/

const ViberChatBot = require('../bot');

describe('ViberChatBot', () => {

  it('should exist', () => {
    expect(ViberChatBot).toBeDefined();
  });

  it('configures a Claudia Rest API', () => {
    expect(ViberChatBot.apiConfig().version).toEqual(3);
  });

});
