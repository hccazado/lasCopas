'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Produtos', { 
      id_produto: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      finca: Sequelize.DataTypes.STRING(45),
      cosecha: Sequelize.DataTypes.ENUM('tardia', 'temprana'),
      tipo: Sequelize.DataTypes.ENUM('tinto', 'branco', 'rose', 'frisante'),
      ano: Sequelize.DataTypes.STRING(5),
      valor: Sequelize.DataTypes.DOUBLE,
      origem: Sequelize.DataTypes.STRING(20),
      rotulo: Sequelize.DataTypes.STRING(200),
      estoque: {
        type: Sequelize.DataTypes.SMALLINT.UNSIGNED
      },
      ativo: {
        type: Sequelize.DataTypes.ENUM('ativo', 'inativo'),
        defaultValue: 'ativo'
      },
      descricao: Sequelize.DataTypes.TEXT
   });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Produtos');
  }
};
