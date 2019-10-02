var express = require('express');
var router = express.Router();

var User = require('../../../models').User
const uuid = require('uuidv4').default;
const bcrypt = require('bcrypt');
const saltRounds = 10;

/* POST user account creation */
router.post('/', function (req, res, next) {
  res.setHeader("Content-type", "application/json")
  bcrypt.hash(req.params.password, saltRounds, function(err, hash) {
    User.create({
      email: req.params.email,
      passwordDigest: req.params.password,
      apiKey: uuid()
    })
    .then(user => {
      res.status(201).send(JSON.stringify({
        status: res.statusCode,
        apiKey: user.apiKey
      }))
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({error})
    })
  })
});

module.exports = router;
