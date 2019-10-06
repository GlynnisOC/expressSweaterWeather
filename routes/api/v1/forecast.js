var express = require('express');
var router = express.Router();

var User = require('../../../models').User;
var uuid = require('uuidv4').default;
var bcrypt = require('bcrypt');
var saltRounds = 10;

router.get("/", function(req, res, next) {

});

module.exports = router;
