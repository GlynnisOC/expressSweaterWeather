var express = require('express');
var router = express.Router();

var user = require('../../../models').User

/* POST user account creation */
router.post('/', function (req, res, next) {
  res.setHeader("Content-type", "application/json")
  user.create({
    email: req.params.email,
    password: req.params.password,
    password_confirmation: req.params.password,
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
