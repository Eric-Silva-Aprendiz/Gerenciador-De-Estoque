'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Fornecedores', {
      id: {
        allowNull: false,
        autoIncrement: true,        
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        allowNull: false,
        type: Sequelize.STRING
      },
      CNPJ: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      endereco: {
        allowNull: false,
        type: Sequelize.STRING
      },
      telefone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nome_do_contato_principal: {
        allowNull: false,
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
    await queryInterface.dropTable('Fornecedores');
  }
};