'use strict';

const requestPromise = require('minimal-request-promise');
const he = require('he');
const botBuilder = require('claudia-bot-builder');

module.exports = botBuilder(request => {
  if (request.type === 'viber') {
    // This section only process Viber messages
    var message = request.text;
    
    console.log(message);

    if (message.match(/joke/i)) {
      var options = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      return requestPromise.get('http://api.icndb.com/jokes/random?limitTo=[nerdy]', options)
        .then(response => {
          console.log(response);
          try {
            let body = JSON.parse(response.body);
            return he.decode(body.value.joke);

          } catch (e) {
            console.log(e);
            return 'No time for jokes :-(';
          }
        })
        .catch(reason => {
          console.log(reason);
          return he.decode(['Thanks for sending ', request.text,
            '\nCurrently I cannot process your request as my batteries are low.',
            '\nI\'ll get back to you once I recuperate.'
          ].join(''));
        });

    } else {
      // This is default message 
      console.log(message);
      return he.decode(['Thanks for sending ', request.text,
        '\nI will try to get some sense out of it and learn to better understand you.',
        '\nHope to be of more service next time.'
      ].join(''));
    }

  } else {
    return 'Thanks for sending ' + request.text;
  }

});
