'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Login', { 
        id_login:{
          type: Sequelize.DataTypes.SMALLINT.UNSIGNED,
          primaryKey:true,
          autoIncrement: true
        },
        email:{
          type: Sequelize.DataTypes.STRING(120),
          unique:true
        },
        senha: Sequelize.DataTypes.STRING(200),
        admin:{
          type: Sequelize.DataTypes.SMALLINT.UNSIGNED,
          defaultValue: 0
        } 
      });
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable('Login');
  }
};
