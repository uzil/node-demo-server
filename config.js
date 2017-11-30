'use strict';

// const { env } = process.env;

const constants = {
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'pretty-little-secret',
  TOKEN_EXPIRES_IN: process.env.TOKEN_EXPIRES_IN || '2h',
  APP_PORT: process.env.APP_PORT || 7000,
  LOG_LEVEL: process.env.LOG_LEVEL || 'info'
};

module.exports = { constants };
