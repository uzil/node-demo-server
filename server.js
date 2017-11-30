/**
 * @file Bootstrap's and start's the server
 */

'use strict';

const { constants } = require('./config');
const logger = require('./utils/logger');
const app = require('./app');

// start server
app.listen(constants.APP_PORT, (error) => {
  if (error) {
    logger.error(`Cannot start express server at port ${constants.APP_PORT}`);
    process.exit();
  }

  logger.info('server listening on ', constants.APP_PORT);
});
