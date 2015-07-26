// Validation for user payloads.
'use strict';

var Hoek = require('hoek');
var Joi = require('joi');

var validators = {};

validators.username = Joi.string().token().allow('-').max(128);
validators.password = Joi.string().min(8).max(128);
validators.email = Joi.string().email();

// Required payload when registering new accounts.
validators.registerAccount = {
  username: validators.username,
  password: validators.password,
  email: Hoek.clone(validators.email).optional().allow('').allow(null)
};

module.exports = validators;
