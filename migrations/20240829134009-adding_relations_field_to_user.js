'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'relations', {
      type: Sequelize.STRING,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'username',
      },
      onDelete: 'CASCADE',
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'relations');
  }
};
