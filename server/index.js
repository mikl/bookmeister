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

module.exports = server;
