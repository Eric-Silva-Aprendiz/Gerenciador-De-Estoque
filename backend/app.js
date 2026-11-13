const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const rotasProdutos = require("./router/produtoRouter.js");
const rotasFornecedores = require("./router/fornecedorRouter.js")
const rotasFornecedoresProdutos = require("./router/fornecedorProdutoRouter.js")
const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser())


app.use("/api/produto/", rotasProdutos);
app.use("/api/fornecedor/", rotasFornecedores)
app.use("/api/associacao/", rotasFornecedoresProdutos)

module.exports = app
