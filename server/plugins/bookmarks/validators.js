// Validation for bookmark payloads.
'use strict';

var Hoek = require('hoek');
var Joi = require('joi');

var validators = {};

validators.bookmarkID = Joi.string().guid();

// Bookmark without ID. Used for the update and save payloads.
validators.bookmarkWithoutID = {
  id: validators.bookmarkID.allow(null),
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
validators.bookmark.id = validators.bookmarkID.required();

module.exports = validators;
