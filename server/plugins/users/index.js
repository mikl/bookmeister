// User plugin, routes for user data and authentication.
'use strict';

let _ = require('lodash');
let async = require('async');
let Boom = require('boom');
let validators = require('./validators');

// Declare internals
let internals = {};

// Register as a Hapi plugin.
exports.register = function (server, options, next) {
  server.route({
    method: 'POST',
    path: '/account/register',
    handler: internals.registerAccount,
    config: {
      validate: {
        payload: {
          account: validators.registerAccount
        }
      }
    },
  });

  next();
};

// Since this plugin is not a Node module, we provide the metadata here.
exports.register.attributes = {
  name: 'bookmeister-users'
};

internals.registerAccount = function (request, reply) {
  let account = request.payload.account;

  async.series([
    function (callback) {
      request.querious.query('users/insert', [
        account.username,
        account.email || null
      ], function (err, result) {
        callback(err);
      });
    },

    function (callback) {
      request.querious.query('users/insert-password', [
        account.username,
        account.password
      ], function (err, result) {
        callback(err);
      });
    }
  ], function (err, results) {
    if (err) {
      return reply(Boom.badImplementation(err));
    }

    reply({}).code(201);
  });

  return reply();
};
