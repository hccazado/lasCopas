'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Clientes', { 
      id_cliente:{
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: Sequelize.DataTypes.STRING(120),
      sobrenome:{
        type: Sequelize.DataTypes.STRING(100),
        allowNull: true
      },
      dt_nascimento:{
        type: Sequelize.DataTypes.DATEONLY,
        allowNull: true
      },
      cadastro: Sequelize.DataTypes.ENUM('fisica','juridica'),
      documento: Sequelize.DataTypes.STRING,
      id_login: {
        type: Sequelize.DataTypes.SMALLINT.UNSIGNED,
        references: {
          model: {
            tableName: 'Login',
          },
          key: 'id_login'
        }
      }
        
    });
  },
  down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable('Clientes');
  }
};
