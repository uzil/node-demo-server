/**
 * @file contains Joi validation schema
 * for user login route
 */

'use strict';

const Joi = require('joi');

const schema = {
  body: {
    username: Joi.string().min(2).required(),
    password: Joi.string().min(2).required()
  }
};

module.exports = schema;
