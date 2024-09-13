'use strict';

const { DataType } = require('sequelize-typescript');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Checkpoints', {
      id: {
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
        unique: true,
        // primaryKey: true
      },
      tag: {
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      title: {
        type: DataType.STRING,
        allowNull: false,
      },
      project: {
        type: DataType.UUID,
        allowNull: false,
        references: {
          model: 'Projects',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },    
      date: {
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
    await queryInterface.dropTable('Checkpoints');
  }
};
