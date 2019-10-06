var express = require('express');
var router = express.Router();

var User = require('../../../models').User;
var uuid = require('uuidv4').default;
// var bcrypt = require('bcrypt');
// var saltRounds = 10;
const fetch = require("node-fetch");

router.get("/", function(req, res, next) {
  if (req.body.apiKey) {
    User.findOne({
      where: {apiKey: req.body.apiKey}
    });
    fetch("https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.location}&key=${process.env.GOOGLE-API-KEY}")
    .then(response => response.json())
    .then(coords => {
      let lat = response.results[0].geometry.location.lat
      let long = response.results[0].geometry.location.lng

      fetch("https://api.darksky.net/forecast/${process.env.DARKSKY-API-KEY}/${lat},${long}")
      .then(dsResponse => dsResponse.json())
      .then(response => {
        res.status(200).send(JSON.stringify({
          // console.log(res)
          location: res.location,
          current: res.currently,
          hourly: res.hourly,
          daily: res.daily
        }))
      })
    });
  } else {
    res.status(401).send("Unauthorized")
  }
});

module.exports = router;
