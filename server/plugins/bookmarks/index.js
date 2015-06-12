// Bookmarks plugin, providing Bookmark routes.
'use strict';

// Load modules
var Boom = require('boom');
var uuid = require('node-uuid');
var validators = require('./validators');

// Declare internals
var internals = {};

// Register as a Hapi plugin.
exports.register = function (server, options, next) {

  server.route({
    method: 'GET',
    path: '/bookmarks',
    handler: internals.getAllBookmarks
  });

  server.route({
    method: 'POST',
    path: '/bookmarks',
    handler: internals.saveNewBookmark,
    config: {
      validate: {
        payload: {
          bookmark: validators.bookmarkWithoutID
        }
      }
    }
  });

  server.route({
    method: 'PUT',
    path: '/bookmarks/{id}',
    handler: internals.updateBookmark,
    config: {
      validate: {
        payload: {
          bookmark: validators.bookmarkWithoutID
        }
      }
    }
  });

  next();
};

// Since this plugin is not a Node module, we provide the metadata here.
exports.register.attributes = {
  name: 'bookmeister-bookmarks'
};

// Handler for the bookmarks index route.
internals.getAllBookmarks = function (request, reply) {
  request.querious.query('bookmarks/load-all', [], function (err, result) {
    if (err) {
      request.log(['error', 'database', 'read', 'bookmarks'], err);
      return reply(Boom.badImplementation(err));
    }

    return reply({bookmarks: result.rows});
  });
};

// Handler for the new bookmark route.
internals.saveNewBookmark = function (request, reply) {
  var bookmarkData = request.payload.bookmark;

  // Make sure we have an ID for the new Bookmark.
  if (!bookmarkData.id) {
    bookmarkData.id = uuid.v1();
  }

  // Save the bookmark to the database.
  request.querious.query('bookmarks/insert', [
    bookmarkData.id,
    bookmarkData.url,
    bookmarkData.title || null,
    bookmarkData.description || null,
  ], function (err, result) {
    if (err) {
      return reply(Boom.badImplementation(err));
    }

    reply({
      bookmark: bookmarkData,
    }).code(201).header('Location', '/bookmark/' + bookmarkData.id);
  });
};

// Handler for updating bookmarks.
internals.updateBookmark = function (request, reply) {
  var bookmarkData = request.payload.bookmark;
  var bookmarkId = request.params.id;

  // Save the bookmark to the database.
  request.querious.query('bookmarks/update', [
    bookmarkData.url,
    bookmarkData.title || null,
    bookmarkData.description || null,
    bookmarkId
  ], function (err, result) {
    if (err) {
      return reply(Boom.badImplementation(err));
    }

    if (result.rowCount < 1) {
      return reply(Boom.notFound('Bookmark not found.'));
    }

    reply({
      bookmark: bookmarkData,
    });
  });

}
