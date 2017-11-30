'use strict';

const validate = require('cartilage');
const Router = require('express').Router();
const controller = require('../controllers/utils.controller');
const schema = require('../validations/utils.validations');
const { wrapController, auth } = require('../utils/middlewares');


Router.post(
  '/createjsonpatch',
  auth, // check auth token
  validate(schema.JSONPatchSchema), // validate incoming request
  wrapController(controller.applyJSONPatch)
);

Router.get(
  '/createthumbnail',
  auth, // check auth token
  validate(schema.createThumb), // validate incoming request
  wrapController(controller.createThumbnail)
);

module.exports = Router;
