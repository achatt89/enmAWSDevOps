'use strict';

var express = require('express');
var controller = require('./login.controller');

var router = express.Router();

router.put('/', controller.index);

module.exports = router;
