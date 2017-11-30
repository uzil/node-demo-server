'use strict';

const Promise = require('bluebird');
const jwt = require('./jwt');
const logger = require('./logger');

/**
 * @description Handles error for generator
 * based controllers.
 * @param {function} controller - A middleware generator function
 */
const wrapController = controller => (req, res, next) => {
  Promise.coroutine(controller)(req, res)
    .catch(next);
};

/**
 * @description Middleware to handle JWT auth
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {functin} next - Express next function
 */
const auth = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).json({
      message: 'Forbidden'
    });
  }

  return jwt.verifyToken(token)
    .then((decodedPayload) => {
      req.user = decodedPayload;
      next();
    })
    .catch(error => res.status(401).json(error));
};

/**
 * @description Handles all the error on the server
 * it logs them and sends proper error response to
 * API callee
 * @param {*} error - Express error object
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next object
 */
// eslint-disable-next-line
const errorHandler = (error, req, res, next) => {
  const errorResponse = {};
  logger.debug(error);

  if (error.isJoi) {
    errorResponse.name = error.name;
    errorResponse.message = error.details[0].message;
  } else errorResponse.message = error.message;

  res.status(400).json(errorResponse);
};

module.exports = {
  auth,
  wrapController,
  errorHandler
};
