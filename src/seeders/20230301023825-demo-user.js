'use strict';

module.exports = {
  up: async ( queryInterface, Sequelize ) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert( 'User', [
      {
        name: 'Peter',
        email: 'peter@gmail.com',
        password: '123@abc'
      }, {
        name: 'Helen',
        email: 'helen@gmail.com',
        password: '123@abc'
      },
      {
        name: 'Alice',
        email: 'alice@gmail.com',
        password: '123@abc'
      }
    ], {} );
  },

  down: async ( queryInterface, Sequelize ) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
