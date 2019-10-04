'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Users', [{
      email: 'mou@ballsrgreat.com',
      passwordDigest: 'password',
      apiKey: '8675309',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'clo@hairballssure.com',
      passwordDigest: 'clo',
      apiKey: '032818',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Users', null, {});

  }
};
