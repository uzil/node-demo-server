'use strict';

const jwt = require('../utils/jwt');

/**
 * @description Login a user
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const login = function* (req, res) {
  const { body } = req;

  const accessToken = yield jwt.generateToken({
    username: body.username,
    password: body.password
  });

  res.status(200).json({ accessToken });
};

module.exports = { login };
