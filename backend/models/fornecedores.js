'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fornecedores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Fornecedores.belongsToMany(models.Produtos, {
        through: models.Fornecedor_Produto,
        foreignKey: "id_fornecedor",
        otherKey: "id_produto",
        as: "produtos"
      })
    }
  }
  Fornecedores.init({
    nome: DataTypes.STRING,
    CNPJ: DataTypes.STRING,
    endereco: DataTypes.STRING,
    telefone: DataTypes.STRING,
    email: DataTypes.STRING,
    nome_do_contato_principal: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Fornecedores',
  });
  return Fornecedores;
};