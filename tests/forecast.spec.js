var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');
const bcrypt = require('bcrypt');
var saltRounds = 10;
var uuid = require('uuidv4').default;

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

  describe('Test GET /api/v1/forecast path', () => {
    test('should return a forecast containing 8 hourly objects and 7 daily objects', () => {
      let email = "mou@ballsrgreat.com"
      let password = 'password'

      user = User.create({
        email: email,
        passwordDigest: bcrypt.hashSync(password, saltRounds),
        apiKey: uuid()
      })
      .then(user => {
        return request(app)
        .get("/api/v1/forecast?location=denver,co")
        .send({apiKey: user.apiKey})
      })
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body['location']).toBe("denver,co")
      })
    })
  });
});
