var express = require('express');
var router = express.Router();

var User = require('../../../models').User;
const fetch = require("node-fetch");
var http = require("http");
require('dotenv').config();


var geocodeOptions = {
  host: 'https://maps.googleapis.com/maps/api/geocode/json',
  path: "?address=${req.query.location}&key=${process.env.GOOGLE-API-KEY}",
  method: 'GET'
};

var darkskyOptions = {
  host: "https://api.darksky.net/forecast",
  path: "/${process.env.DARKSKY-API-KEY}/${lat},${long}",
  method: 'GET'
}

// function getJSON(options, cb) {
//   http.request(geocodeOptions, function(res) {
//     var body = '';
//
//     res.on('data', function(chunk) {
//       body+= chunk;
//     });
//
//     res.on('end', function() {
//       var coords = JSON.parse(body);
//       console.log(coords);
//     })
//   }).end()
// }

router.get("/", function(req, res, next) {
  res.setHeader("Content-Type", "application/json")
  if (req.body.apiKey) {
    User.findOne({
      where: {apiKey: req.body.apiKey}
    })
    let address = req.query.location
    let key = process.env.GOOGLE-API-KEY
    return fetch("https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}")
    .then(response => response.json())
    .then(result => console.log(result))
  // })
  } else {
    res.status(401).send("Unauthorized")
  }
});

module.exports = router;
