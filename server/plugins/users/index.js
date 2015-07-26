// User plugin, routes for user data and authentication.
'use strict';

// Register as a Hapi plugin.
exports.register = function (server, options, next) {
  next();
};

// Since this plugin is not a Node module, we provide the metadata here.
exports.register.attributes = {
  name: 'bookmeister-users'
};
