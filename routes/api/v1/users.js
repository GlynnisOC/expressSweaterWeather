var express = require('express');
var router = express.Router();

var user = require('../../../models').User

const secureRandom = require('secure-random')

/* POST user account creation */
router.post('/', function (req, res, next) {
  res.setHeader("Content-type", "application/json")
  user.create({
    email: req.params.email,
    password_digest: req.params.password,
    api_key: secureRandom(10, {type: 'Uint8Array'}),
  })
  .then(user => {
    res.status(201).send(user.api_key)
  })
  .catch(error => {
    console.log(error)
    res.status(500).send({error})
  })
});

module.exports = router;
