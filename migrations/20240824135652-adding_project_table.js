'use strict';

const { DataType } = require('sequelize-typescript');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Projects', {
      id: {
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      title: {
        type: DataType.STRING,
        allowNull: false
      },
      description: {
        type: DataType.STRING,
        allowNull: false
      },
      owner: {
        type: DataType.STRING,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'username'
        }
      },
      progress: {
        type: DataType.ENUM(
          'PENDING',
          'IN_PROGRESS',
          'PAUSED',
          'COMPLETED'
        ),
        defaultValue: 'PENDING',
        allowNull: false
      },
      due_date: {
        type: DataType.DATE,
        allowNull: false
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
    await queryInterface.dropTable('Projects')
  }
};
