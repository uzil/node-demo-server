'use strict';

const winston = require('winston');
const { constants } = require('../config');

// winston log in console transport
const consoleTransport = new (winston.transports.Console)({
  colorize: true,
  timestamp: true,
  level: constants.LOG_LEVEL
});

// Init logger
const logger = new (winston.Logger)({
  transports: [consoleTransport]
});

module.exports = logger;
