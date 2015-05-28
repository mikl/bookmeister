// Simple script to start the server.
'use strict';

var server = require('..');

server.start(function () {
  console.info('Bookmeister server started at ' + server.info.uri);
});
