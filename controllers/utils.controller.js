'use strict';

const jsonPatch = require('jsonpatch');
const sharp = require('sharp');
const request = require('request-promise');

/**
 * @description update a given json obj with a patch
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const applyJSONPatch = function* (req, res) {
  const { body } = req;
  const response = jsonPatch.apply_patch(body.json, body.patch);

  res.status(200).json(response);
};

/**
 * @description Convert's a given image URL to thumbnail
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const createThumbnail = function* (req, res) {
  const { query } = req;

  // fetch image
  const response = yield request({
    method: 'GET',
    uri: query.url,
    encoding: null
  });

  // convert image to buffer
  const orignalImgBuffer = Buffer.from(response);

  // resize image
  const resizedImg = yield sharp(orignalImgBuffer).resize(50, 50).toBuffer({
    resolveWithObject: true
  });

  // set content type
  res.set('content-type', `image/${resizedImg.info.format}`);
  res.send(resizedImg.data);
};

module.exports = {
  applyJSONPatch,
  createThumbnail
};
