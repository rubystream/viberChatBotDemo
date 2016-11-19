'use strict';

const botBuilder = require('claudia-bot-builder');

module.exports = botBuilder(request => {
  return 'Thanks for sending ' + request.text;
});