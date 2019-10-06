var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');
const bcrypt = require('bcrypt');
var saltRounds = 10;

var User = require('../models').User;

var pry = require('pryjs')

describe('api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create')
  });
  beforeEach(() => {
      shell.exec('npx sequelize db:migrate')
      shell.exec('npx sequelize db:seed:all')
    });
  afterEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all')
  });

  describe('Test POST /api/v1/sessions path', () => {
    test('should return a 200 status and api key', () => {
      let email = "mou@ballsrgreat.com"
      let password = 'password'

      user = User.create({
        email: email,
        passwordDigest: bcrypt.hashSync(password, saltRounds),
        apiKey: 'eawdfsaojewa7873'
      })
      .then(user => {
        return request(app)
        .post("/api/v1/sessions")
        .send({email: email, password: password})
      })
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body['apiKey']).not.toBe(null)
        expect(response.body['apiKey']).toBe(user.apiKey)
      })
    })
  });
});
