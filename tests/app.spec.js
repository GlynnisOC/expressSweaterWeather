var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');

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

  describe('Test the root path', () => {
    test('should return a 200', () => {
      return request(app).get("/").then(response => {
        expect(response.statusCode).toBe(200)
      })
    });
  });

  describe('Test POST /api/v1/users path', () => {
    test('should return a 201 status', () => {
      return request(app).post("/api/v1/users").then(response => {
        expect(response.statusCode).toBe(201)
      });
    });
    // test('should return the api key of the user upon registering', () => {
    //   let params = {
    //     'email': 'mou@ballsrgreat.com',
    //     'password': 'password',
    //     'password_confirmation': 'password'
    //   }
    //   return request(app).post("/api/v1/users").send(params)
    //   .then(response => {
    //     expect(response.body['api_key']).not.toBe(null)
    //     expect(response.body['api_key'].length).toBeGreaterThan(0);
    //   })
    // })
  });
});
