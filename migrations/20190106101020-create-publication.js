'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Publications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      id_type_pub: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Type_pubs',
          key: 'id'
        }
      },
      objet: {
        allowNull: false,
        type: Sequelize.STRING
      },
      date_publication: {
        allowNull: false,
        type: Sequelize.DATE
      },
      nbr_traduction: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('Publications');
  }
};