// var shell = require('shelljs');
// var request = require("supertest");
// var app = require('../app');
// var pry = require('pryjs')
//
// describe('api', () => {
//   beforeAll(() => {
//     shell.exec('npx sequelize db:create')
//   });
//   beforeEach(() => {
//       shell.exec('npx sequelize db:migrate')
//       shell.exec('npx sequelize db:seed:all')
//     });
//   afterEach(() => {
//     shell.exec('npx sequelize db:migrate:undo:all')
//   });
//
//   describe('Test the root path', () => {
//     test('should return a 200', () => {
//       return request(app).get("/").then(response => {
//         expect(response.statusCode).toBe(200)
//       })
//     });
//   });
//
//   describe('Test POST /api/v1/users path', () => {
//     test('should return a 201 and user api key', () => {
//       return request(app)
//       .post("/api/v1/users")
//       .send({
//         'email': 'mou@ballsrgreat.com',
//         'password': 'password',
//         'password_confirmation': 'password'
//       })
//       .then(response => {
//         expect(response.statusCode).toBe(201);
//         expect(response.body['apiKey']).not.toBe(null)
//         expect(response.body['apiKey'].length).toBeGreaterThan(1);
//       })
//     });
//   });
// });
