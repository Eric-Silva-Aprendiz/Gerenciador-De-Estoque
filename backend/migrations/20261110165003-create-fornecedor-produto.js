'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Fornecedor_Produtos', {      
      id_fornecedor: {                
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references:{
          model: "Fornecedores",
          key: "id"
        }
      },
      nome_fornecedor: {
        type: Sequelize.STRING
      },
      id_produto: {        
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references:{
          model: "Produtos",
          key: "id"
        }
      },
      nome_produto: {
        type: Sequelize.STRING
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Fornecedor_Produtos');
  }
};