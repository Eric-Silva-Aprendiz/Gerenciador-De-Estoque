'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produtos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Produtos.belongsToMany(models.Fornecedores, {
        through: models.Fornecedor_Produto,
        foreignKey: "id_produto",
        otherKey: "id_fornecedor",
        as: "fornecedores"
      });
    };
  }
  Produtos.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING,
    quantidade: DataTypes.INTEGER,
    categoria: DataTypes.STRING,
    data_de_validade: DataTypes.DATE,
    preco: DataTypes.INTEGER,
    codigo_de_Barras: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Produtos',
  });
  return Produtos;
};