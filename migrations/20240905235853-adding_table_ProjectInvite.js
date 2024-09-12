'use strict';

const { DataType } = require('sequelize-typescript');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('ProjectInvites', {
      id: {
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      pending: {
        type: DataType.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      project: {
        type: DataType.UUID,
        allowNull: false,
        references: {
          model: 'Projects',
          key: 'id'
        },
        unique: true
      },
      sender: {
        type: DataType.STRING,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'username'
        },
        unique: true
      },
      receiver: {
        type: DataType.STRING,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'username'
        },
        unique: true
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('ProjectInvites');
  }
};
