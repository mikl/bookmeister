// Hapi server object definition.
'use strict';

var config = require('./config');
var Hapi = require('hapi');
var path = require('path');

var server = new Hapi.Server({});

server.connection({
  address: config.http.address,
  port: config.http.port,

  routes: {
    cors: config.cors || false
  }
});

// Configure logging of server state with Good.
server.register({
  register: require('good'),
  options: {
    reporters: [{
      reporter: require('good-console'),
      events: { log: '*', response: '*', error: '*' }
    }]
  }
}, function (err) {
  if (err) { throw err; }
});

module.exports = server;
