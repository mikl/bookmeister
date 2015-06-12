// Validation for bookmark payloads.
'use strict';

var Hoek = require('hoek');
var Joi = require('joi');

var validators = {};

// Bookmark without ID. Used for the update and save payloads.
validators.bookmarkWithoutID = {
  id: Joi.string().allow(null),
  url: Joi.string()
    .required()
    .max(200, 'utf-8'),
  title: Joi.string()
    .max(200, 'utf-8')
    .allow(null),
  description: Joi.string().allow(null),
  added_at: Joi.string().allow(null),
  created_at: Joi.string().allow(null),
  updated_at: Joi.string().allow(null),
};

// The full bookmark payload, requiring the ID.
validators.bookmark = Hoek.clone(validators.bookmarkWithoutID);
validators.bookmark.id = validators.bookmark.id.required();

module.exports = validators;
