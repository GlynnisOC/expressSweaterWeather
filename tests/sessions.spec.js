var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');
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
      let params = {
        email: 'mou@ballsrgreat.com',
        password: 'password'
      }
      return User.create({
        email: 'mou@ballsrgreat.com',
        password: 'password',
        apiKey: 'eawdfsaojewa7873'
      })
      .then(user => {
        return request(app)
        .post("/api/v1/sessions")
        .send(params)
      })
      .then(response => {
        expect(response.statusCode).toBe(200)
      })
    })
  });
});
