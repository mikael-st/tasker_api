'use strict';

const { DataType } = require('sequelize-typescript');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Relations', {
      id: {
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      user: {
        type: DataType.STRING,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'username'
        },
        unique: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      related: {
        type: DataType.STRING,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'username'
        },
        unique: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Relations');
  }
};
