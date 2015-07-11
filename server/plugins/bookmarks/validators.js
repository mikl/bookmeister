// Validation for bookmark payloads.
'use strict';

var Hoek = require('hoek');
var Joi = require('joi');

var validators = {};

validators.bookmarkID = Joi.string().guid();

// Bookmark without ID. Used for the update and save payloads.
validators.bookmarkWithoutID = {
  id: validators.bookmarkID.allow(null).optional(),
  url: Joi.string()
    .required()
    .uri({
      scheme: [
        'http',
        'https',
      ]
    }),
  title: Joi.string()
    .max(200, 'utf-8')
    .optional().allow(null),
  description: Joi.string().optional().allow(null),
  added_at: Joi.date().iso().optional().allow(null),
  created_at: Joi.date().iso().optional().allow(null),
  updated_at: Joi.date().iso().optional().allow(null),
  'private': Joi.boolean().optional(),
  to_read: Joi.boolean().optional(),

  tags: Joi.array()
    .items(Joi.string()
      // Limit each tag to 50 characters.
      .max(50, 'utf-8')
      // Remove extraneous whitespace.
      .trim()
      // Disallow commas in tags.
      .regex(/^[^,]+$/, 'no commas')
    )
    // 20 tags per bookmark should be enough for everyone, right?
    .max(20)
    // Duplicate tags not allowed.
    .unique()
    // Tags are not required.
    .optional()
};

// The full bookmark payload, requiring the ID.
validators.bookmark = Hoek.clone(validators.bookmarkWithoutID);
validators.bookmark.id = validators.bookmarkID.required();

validators.pageNumber = Joi.number().integer().positive().max(1000);
validators.itemsPerPage = Joi.number().integer().positive().max(100).multiple(5);

module.exports = validators;
