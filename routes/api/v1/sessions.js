var express = require('express');
var router = express.Router();
var User = require('../../../models').User
const bcrypt = require('bcrypt');

router.post("/", function(req, res, next) {
  res.setHeader("Content-Type", "application/json")
  if (req.body.email && req.body.password) {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then(user => {
      trueUser = bcrypt.compareSync(req.body.password, user.passwordDigest)
        if (trueUser) {
          res.status(200).send({
            apiKey: user.apiKey
          })
        } else {
          res.status(401).send("Access denied")
        }
    })
    .catch(error => {
      res.status(500).send({error})
    })
  }
});


module.exports = router;
