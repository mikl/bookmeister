// Import plugin, handles import of data from other services.
'use strict';

var _ = require('lodash');
var async = require('async');
var Boom = require('boom');
var uuid = require('node-uuid');

// Declare internals
var internals = {};

// Register as a Hapi plugin.
exports.register = function (server, options, next) {
  server.route({
    method: 'POST',
    path: '/import',
    handler: internals.importData,
    config: {
      payload: {
        maxBytes: 1024 * 1024 * 16,
      },
    },
  });

  next();
};

// Since this plugin is not a Node module, we provide the metadata here.
exports.register.attributes = {
  name: 'bookmeister-import'
};

// Route handling reciept of import data.
internals.importData = function (request, reply) {
  if (request.payload.file && _.isArray(request.payload.file)) {
    async.eachLimit(request.payload.file, 16, function (item, callback) {

      // First check that the bookmark hasn't already been imported.
      request.querious.query('bookmarks/load-by-url', [
        item.href
      ], function (err, result) {
        if (!err && result.rowCount === 0) {
          request.querious.query('bookmarks/import', [
            uuid.v4(),
            item.href,
            item.description,
            item.extended,
            item.time,
            (item.shared !== 'yes'),
            (item.toread === 'yes'),
          ], callback);
        }
        else {
          return callback(err);
        }
      });

    }, function (err) {
      if (err) {
        throw err;
      }
      else {
        return reply();
      }
    });
  }
};
