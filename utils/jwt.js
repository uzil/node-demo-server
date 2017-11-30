'use strict';

const Promise = require('bluebird');
const jwt = Promise.promisifyAll(require('jsonwebtoken'));
const { constants } = require('../config');

/**
 * @description Generates JWT token
 * @param {object} payload
 * @return {Promise} JWT token
 */
const generateToken = (payload) => {
  const token = jwt.signAsync(payload, constants.TOKEN_SECRET, {
    expiresIn: constants.TOKEN_EXPIRES_IN
  });

  return token;
};

/**
 * @description Decodes JWT token
 * @param {object} token - JWT token
 * @return {Promise} Decoded payload
 */
const verifyToken = token => jwt.verifyAsync(token, constants.TOKEN_SECRET);

module.exports = {
  generateToken,
  verifyToken
};
