var express = require('express');
var router = express.Router();

var User = require('../../../models').User;
const fetch = require("node-fetch");
var http = require("http");
require('dotenv').config();

var darkskyOptions = {
  host: "https://api.darksky.net/forecast",
  path: "/${process.env.DARKSKY-API-KEY}/${lat},${long}",
  method: 'GET'
}

router.get("/", function(req, res, next) {
  res.setHeader("Content-Type", "application/json")
  if (req.body.apiKey) {
    User.findOne({
      where: {apiKey: req.body.apiKey}
    })
    .then(user => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.location}&key=${process.env.GOOGLE_API_KEY}`)
    .then(response => response.json())
    .then(result => {
      coords = {
      lat: result.results[0].geometry.location.lat,
      long: result.results[0].geometry.location.lng
    }
  })
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.location}`)
  } else {
    res.status(401).send("Unauthorized")
  }
});


module.exports = router;
