'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Pedidos', { 
        id_pedido: {
          type: Sequelize.DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true
      },
      id_endereco: Sequelize.DataTypes.INTEGER.UNSIGNED,
      id_cliente: Sequelize.DataTypes.INTEGER.UNSIGNED
      });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Pedidos');
  }
};
