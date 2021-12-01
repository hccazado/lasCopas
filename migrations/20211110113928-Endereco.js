'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Enderecos', { 
      id_endereco: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    cep: Sequelize.DataTypes.CHAR(10),
    endereco: Sequelize.DataTypes.STRING(100),
    complemento: Sequelize.DataTypes.STRING(50),
    numero: Sequelize.DataTypes.CHAR(5),
    bairro: Sequelize.DataTypes.STRING(45),
    cidade: Sequelize.DataTypes.STRING(45),
    uf: Sequelize.DataTypes.STRING(2),
    id_cliente: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        references: {
          model: {
            tableName: 'Clientes',
          },
          key: 'id_cliente'
        }
    }
    });
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Enderecos');
  }
};
