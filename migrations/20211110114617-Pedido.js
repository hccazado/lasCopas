'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Pedidos', { 
        id_pedido: {
          type: Sequelize.DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true
        },
        id_endereco: {
          type: Sequelize.DataTypes.INTEGER.UNSIGNED,
          references: {
            model: {
              tableName: 'Enderecos',
            },
            key: 'id_endereco'
          }
        },
        id_cliente: {
          type: Sequelize.DataTypes.INTEGER.UNSIGNED,
          references: {
            model: {
              tableName: 'Clientes',
            },
            key: 'id_cliente'
          }
        },
        data: Sequelize.DataTypes.DATEONLY
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Pedidos');
  }
};
