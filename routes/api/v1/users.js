var express = require('express');
var router = express.Router();

var User = require('../../../models').User;
var uuid = require('uuidv4').default;
var bcrypt = require('bcrypt');
var saltRounds = 10;

/* POST user account creation */
router.post("/", function(req, res, next) {
  if (req.body.email && req.body.password && req.body.password_confirmation) {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      User.create({
        email: req.body.email,
        passwordDigest: hash,
        apiKey: uuid()
      })
      .then(user => {
        res.setHeader("Content-Type", "application/json");
        res.status(201).send(JSON.stringify({apiKey: user.apiKey}));
      })
      .catch(error => {
        res.status(500).send({error})
      });
    });
  } else {
    res.status(500).send("Account cannot be created")
  }
});

module.exports = router;
