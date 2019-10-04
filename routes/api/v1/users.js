var express = require('express');
var router = express.Router();

var user = require('../../../models').User
const uuid = require('uuidv4').default;
const bcrypt = require('bcrypt');
const saltRounds = 10;

/* POST user account creation */
router.post('/', function (req, res, next) {
  res.setHeader("Content-type", "application/json")
  if ((req.params.email && req.params.password && req.params.password_confirmation) && (req.params.password == req.params.password_confirmation))
  return
  bcrypt.hash(req.params.password, saltRounds, function(err, hash) {
    user.create({
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
