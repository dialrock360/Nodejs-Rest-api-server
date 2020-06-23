'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Contenus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_publication: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Publications',
          key: 'id'
        }
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      langue: {
        allowNull: false,
        type: Sequelize.STRING
      },
      contain: {
        allowNull: false,
        type: Sequelize.STRING
      },
      audio: {
        allowNull: true,
        type: Sequelize.STRING
      },
      video: {
        allowNull: true,
        type: Sequelize.STRING
      },
      flag: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Contenus');
  }
};