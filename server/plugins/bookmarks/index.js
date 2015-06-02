// Bookmarks plugin, providing Bookmark routes.
'use strict';

// Load modules
var Boom = require('boom');

// Declare internals
var internals = {};

// Register as a Hapi plugin.
exports.register = function (server, options, next) {

  server.route({
    method: 'GET',
    path: '/bookmarks',
    handler: internals.getBookmarks
  });

  next();
};

// Since this plugin is not a Node module, we provide the metadata here.
exports.register.attributes = {
  name: 'bookmeister-bookmarks'
};

// Handler for the root skills route.
internals.getBookmarks = function (request, reply) {
  request.querious.query('bookmarks/load-all', [], function (err, result) {
    if (err) {
      request.log(['error', 'database', 'read', 'bookmarks'], err);
      return reply(Boom.wrap(err));
    }

    return reply({bookmarks: result.rows});
  });
};
