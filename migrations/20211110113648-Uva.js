'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Uvas', { 
      id_uva:{
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    nome_uva: Sequelize.DataTypes.STRING(20) 
  });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Uvas');
  }
};
