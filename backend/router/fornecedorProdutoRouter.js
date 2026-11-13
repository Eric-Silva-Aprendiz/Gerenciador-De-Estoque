const express = require("express");
const router = express.Router();
const fornecedorProdutoServices = require("../services/fornecedorProdutoServices.js");

router.post("/", async (req, res) => {
    try {        
        const associacao = await fornecedorProdutoServices.cadastrarAssociacao(req.body);        
        res.status(201).json({mensagem: "Fornecedor associado com sucesso ao produto", associacao});
    } catch (error) {
        if(error.statusCode){return res.status(error.statusCode).json({mensagem: error.message});}
        console.error(error);
        res.status(500).json({mensagem: "erro interno no servidor"});
    }
});

router.put("/:id_fornecedor/:id_produto", async (req, res) => {
    try{
        await fornecedorProdutoServices.atualizarAssociacao(req.body, Number(req.params.id_fornecedor), Number(req.params.id_produto));        
        res.status(200).json({mensagem: "Associação atualizado com sucesso"});
    } catch(error){
        if(error.statusCode){return res.status(error.statusCode).json({mensagem: error.message});}
        console.error(error);
        res.status(500).json({mensagem: "erro interno no servidor"});
    }
});

router.delete("/:id_fornecedor/:id_produto", async (req, res) => {
    try{
        await fornecedorProdutoServices.deletarAssociacao(Number(req.params.id_fornecedor), Number(req.params.id_produto));        
        res.status(200).json({mensagem: "Associação deletada com sucesso"});
    } catch(error){
        if(error.statusCode){return res.status(error.statusCode).json({mensagem: error.message});}
        console.error(error);
        res.status(500).json({mensagem: "erro interno no servidor"});
    }
});

router.get("/:id_fornecedor/:id_produto", async (req, res) => {
    try{
        const associacao = await fornecedorProdutoServices.retornarAssociacao(Number(req.params.id_fornecedor), Number(req.params.id_produto));        
        res.status(201).json({associacao});
    } catch(error){
        if(error.statusCode){return res.status(error.statusCode).json({mensagem: error.message});}
        console.error(error);
        res.status(500).json({mensagem: "erro interno no servidor"});
    }
});

module.exports = router;