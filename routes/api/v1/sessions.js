var express = require('express');
var router = express.Router();
var user = require('../../../models').User
const bcrypt = require('bcrypt');

router.post("/", function (req, res, next) {
  res.setHeader("Content-type", "application/json")
  user.findOne({
    email: req.body.email
  })
  .then(user => {
    



    if (bcrypt.compareSync(req.body.password, user.passwordDigest)) {
      res.status(200).send(JSON.stringify({
        status: res.statusCode,
        apiKey: user.apiKey
      }))
    }
  })
  .catch(error => {
    console.log('the error', error)
    res.status(500).send({error})
  })
})


module.exports = router;
