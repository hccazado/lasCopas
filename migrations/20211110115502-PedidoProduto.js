'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Pedidos_Produtos', {
      id_pedido: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        references: {
          model: {
            tableName: 'Pedidos',
          },
          key: 'id_pedido'
        }
      },
    id_produto: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        references: {
          model: {
            tableName: 'Produtos',
          },
          key: 'id_produto'
        }
      },
    quantidade: Sequelize.DataTypes.INTEGER.UNSIGNED,
    valor: Sequelize.DataTypes.DOUBLE
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Pedidos_Produtos');
  }
};
