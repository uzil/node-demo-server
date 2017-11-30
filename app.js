'use strict';

const app = require('express')();
const bodyParser = require('body-parser');
const loadRoutes = require('./routes');
const { errorHandler } = require('./utils/middlewares');

app.use(bodyParser.json());
loadRoutes(app);
app.use(errorHandler);

module.exports = app;
