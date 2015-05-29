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

// Configure database connections for use on requests.
server.register({
  register: require('hapi-node-postgres'),
  options: {
    attach: 'onPreAuth',
    connectionString: config.database,
    native: true
  }
}, function (err) {
  if (err) {
    console.error('Failed loading "hapi-node-postgres" plugin');
  }
});

// Configure Querious.
server.register({
  register: require('hapi-querious'),
  options: {
    // Reflecting the attach setting on node-hapi-postgres.
    attach: 'onPreAuth',
    cache_sql: true,
    dialect: "postgresql",
    sql_folder: path.resolve(__dirname, 'sql')
  }
}, function (err) {
  if (err) {
    console.error('Failed loading "hapi-querious" plugin');
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
