'use strict';

const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
// eslint-disable-next-line
app.use((error, req, res, next) => res.status(400).json(error));

module.exports = app;
