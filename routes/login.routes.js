'use strict';

const validate = require('cartilage');
const Router = require('express').Router();
const controller = require('../controllers/login.controller');
const schema = require('../validations/login.validations');
const { wrapController } = require('../utils/middlewares');


Router.post(
  '/login',
  validate(schema), // validate incoming request
  wrapController(controller.login)
);

module.exports = Router;
