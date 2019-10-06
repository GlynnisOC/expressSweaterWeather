var express = require('express');
var router = express.Router();

var User = require('../../../models').User;
var uuid = require('uuidv4').default;
var bcrypt = require('bcrypt');
var saltRounds = 10;

router.get("/", function(req, res, next) {
  if (req.body.apiKey) {
    User.findOne({
      where: {apiKey: req.body.apiKey}
    });
    fetch("https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.location}&key=${process.env.GOOGLE-API-KEY}")
    .then(coords => {
      lat: response.results.geometry.location.lat,
      long: response.results.geometry.location.lng
    }
  } else {
    res.status(401).send("Unauthorized")
  }
});

module.exports = router;
