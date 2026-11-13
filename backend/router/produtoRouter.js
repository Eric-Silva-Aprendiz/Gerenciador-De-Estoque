const express = require("express");
const router = express.Router();
const produtoServices = require("../services/produtoServices")


router.post("/", async (req, res) => {
    try {        
        const produto = await produtoServices.cadastrarProduto(req.body);        
        res.status(201).json({mensagem: "Produto cadastrado com sucesso", produto});
    } catch (error) {
        if(error.statusCode){return res.status(error.statusCode).json({mensagem: error.message});}
        console.error(error);
        res.status(500).json({mensagem: "erro interno no servidor"});
    }
});

router.put("/:id", async (req, res) => {
    try{
        await produtoServices.atualizarProduto(req.body, Number(req.params.id));        
        res.status(200).json({mensagem: "Produto atualizado com sucesso"});
    } catch(error){
        if(error.statusCode){return res.status(error.statusCode).json({mensagem: error.message});}
        console.error(error);
        res.status(500).json({mensagem: "erro interno no servidor"});
    }
});

router.delete("/:id", async (req, res) => {
    try{
        await produtoServices.deletarProduto(Number(req.params.id));        
        res.status(200).json({mensagem: "Produto deletado com sucesso"});
    } catch(error){
        if(error.statusCode){return res.status(error.statusCode).json({mensagem: error.message});}
        console.error(error);
        res.status(500).json({mensagem: "erro interno no servidor"});
    }
});

router.get("/:id", async (req, res) => {
    try{
        const produto = await produtoServices.retornarProduto(Number(req.params.id));        
        res.status(201).json({produto});
    } catch(error){
        if(error.statusCode){return res.status(error.statusCode).json({mensagem: error.message});}
        console.error(error);
        res.status(500).json({mensagem: "erro interno no servidor"});
    }
});

module.exports = router;