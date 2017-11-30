/**
 * @file contains Joi validation schema
 * for create json patch and create thumbnail routes
 */

'use strict';

const Joi = require('joi');

const JSONPatchSchema = {
  body: {
    json: Joi.object().required(),
    patch: Joi.array().required()
  }
};

const createThumb = {
  query: {
    url: Joi.string().uri().required()
  }
};

module.exports = {
  JSONPatchSchema,
  createThumb
};
