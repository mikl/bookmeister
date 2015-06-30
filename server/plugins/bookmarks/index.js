// Bookmarks plugin, providing Bookmark routes.
'use strict';

// Load modules
var _ = require('lodash');
let async = require('async');
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
    handler: internals.getAllBookmarks,
    config: {
      validate: {
        query: {
          page: validators.pageNumber,
          per_page: validators.itemsPerPage
        }
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/bookmarks/{id}',
    handler: internals.getBookmarkByID,
    config: {
      response: {
        schema: {
          bookmark: validators.bookmark
        }
      },
      validate: {
        params: {
          id: validators.bookmarkID.required()
        }
      }
    }
  });

  server.route({
    method: 'DELETE',
    path: '/bookmarks/{id}',
    handler: internals.deleteBookmarkByID,
    config: {
      validate: {
        params: {
          id: validators.bookmarkID.required()
        }
      }
    }
  });

  server.route({
    method: 'POST',
    path: '/bookmarks',
    handler: internals.saveNewBookmark,
    config: {
      response: {
        schema: {
          bookmark: validators.bookmark
        }
      },
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
        params: {
          id: validators.bookmarkID.required()
        },
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
  let pageNumber = request.query.page || 1;
  let itemsPerPage = request.query.per_page || 10;
  let offset = (pageNumber - 1) * itemsPerPage;

  async.parallel({
    count: function(callback){
      request.querious.query('bookmarks/count', [], callback);
    },
    bookmarks: function(callback){
      request.querious.query('bookmarks/load-paged', [itemsPerPage, offset], callback);
    }
  },
  function(err, results) {
    if (err) {
      request.log(['error', 'database', 'read', 'bookmarks'], err);
      return reply(Boom.badImplementation(err));
    }
    else {
      return reply({
        bookmarks: results.bookmarks.rows,
        meta: {
          total_pages: Math.ceil(results.count.rows[0].count / itemsPerPage)
        }
      });
    }
  });
};

// Handler for the get bookmark by ID route.
internals.getBookmarkByID = function (request, reply) {
  request.querious.query('bookmarks/load-by-id', [request.params.id], function (err, result) {
    if (err) {
      request.log(['error', 'database', 'read', 'bookmarks'], err);
      return reply(Boom.badImplementation(err));
    }

    if (result.rowCount < 1) {
      return reply(Boom.notFound('Bookmark not found.'));
    }

    return reply({bookmark: result.rows[0]});
  });
};

// Handler for the delete bookmarks route.
internals.deleteBookmarkByID = function (request, reply) {
  request.querious.query('bookmarks/delete-by-id', [request.params.id], function (err, result) {
    if (err) {
      request.log(['error', 'database', 'read', 'bookmarks'], err);
      return reply(Boom.badImplementation(err));
    }

    return reply().code(204);
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
    bookmarkData.private || false,
    bookmarkData.to_read || false,
  ], function (err, result) {
    if (err) {
      return reply(Boom.badImplementation(err));
    }

    // Update the bookmark object with the data returned from the
    // database. At the time of this writing, these are only the date
    // fields, but it could be more with time.
    _.assign(bookmarkData, result.rows[0]);

    reply({
      bookmark: bookmarkData,
    }).code(201).header('Location', '/bookmark/' + bookmarkData.id);
  });
};

// Handler for updating bookmarks.
internals.updateBookmark = function (request, reply) {
  var bookmarkData = request.payload.bookmark;

  // Save the bookmark to the database.
  request.querious.query('bookmarks/update', [
    bookmarkData.url,
    bookmarkData.title || null,
    bookmarkData.description || null,
    bookmarkData.private || false,
    bookmarkData.to_read || false,
    request.params.id
  ], function (err, result) {
    if (err) {
      return reply(Boom.badImplementation(err));
    }

    if (result.rowCount < 1) {
      return reply(Boom.notFound('Bookmark not found.'));
    }

    // Update the bookmark object with the data returned from the
    // database. At the time of this writing, these are only the date
    // fields, but it could be more with time.
    _.assign(bookmarkData, result.rows[0]);

    reply({
      bookmark: bookmarkData,
    });
  });
};
