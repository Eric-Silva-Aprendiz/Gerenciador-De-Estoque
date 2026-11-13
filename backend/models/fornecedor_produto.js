'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fornecedor_Produto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Fornecedor_Produto.belongsTo(models.Fornecedores,{
        foreignKey: "id_fornecedor",
        as: "fornecedor"
      });

      Fornecedor_Produto.belongsTo(models.Produtos,{
        foreignKey: "id_produto",
        as: "produto"
      });
    };
  }
  Fornecedor_Produto.init({
    id_fornecedor: DataTypes.INTEGER,
    nome_fornecedor: DataTypes.STRING,
    id_produto: DataTypes.INTEGER,
    nome_produto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Fornecedor_Produto',
  });
  return Fornecedor_Produto;
};