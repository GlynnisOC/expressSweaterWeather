var express = require('express');
var router = express.Router();
var user = require('../../../models').User
const bcrypt = require('bcrypt');

router.post("/", function (req, res, next) {
  res.setHeader("Content-type", "application/json")
  if (req.body.email && req.body.password)
  user.findOne({
    where: {email: req.body.email}
  })
  .then(user => {
    trueUser = (bcrypt.compareSync(req.body.password, user.passwordDigest))
    if (trueUser) {
      res.status(200).send(JSON.stringify({
        status: res.statusCode,
        apiKey: user.apiKey
      }))
    } else {
      res.status(401).send(JSON.stringify("Access Denied"))
    }
  })
  .catch(error => {
    console.log('the error', error)
    res.status(500).send({error})
  })
})


module.exports = router;
