'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Produtos_Uvas', { 
      produto_id: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        references: {
          model: {
            tableName: 'Produtos',
          },
          key: 'id_produto'
        }
      },
      uva_id: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        references: {
          model: {
            tableName: 'Uvas',
          },
          key: 'id_uva'
        }
      } 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Produtos_Uvas');
  }
};
