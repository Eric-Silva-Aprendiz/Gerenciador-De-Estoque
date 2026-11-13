const express = require("express");
const router = express.Router();
const fornecedorServices = require("../services/fornecedorServices")


router.post("/", async (req, res) => {
    try {        
        const fornecedor = await fornecedorServices.cadastrarFornecedor(req.body);        
        res.status(201).json({mensagem: "Fornecedor cadastrado com sucesso", fornecedor});
    } catch (error) {
        if(error.statusCode){return res.status(error.statusCode).json({mensagem: error.message});}
        console.error(error);
        res.status(500).json({mensagem: "erro interno no servidor"});
    }
});

router.put("/:id", async (req, res) => {
    try{
        await fornecedorServices.atualizarFornecedor(req.body, Number(req.params.id));        
        res.status(200).json({mensagem: "Fornecedor atualizado com sucesso"});
    } catch(error){
        if(error.statusCode){return res.status(error.statusCode).json({mensagem: error.message});}
        console.error(error);
        res.status(500).json({mensagem: "erro interno no servidor"});
    }
});

router.delete("/:id", async (req, res) => {
    try{
        await fornecedorServices.deletarFornecedor(Number(req.params.id));        
        res.status(200).json({mensagem: "Fornecedor deletado com sucesso"});
    } catch(error){
        if(error.statusCode){return res.status(error.statusCode).json({mensagem: error.message});}
        console.error(error);
        res.status(500).json({mensagem: "erro interno no servidor"});
    }
});

router.get("/:id", async (req, res) => {
    try{
        const fornecedor = await fornecedorServices.retornarFornecedor(Number(req.params.id));        
        res.status(201).json({fornecedor});
    } catch(error){
        if(error.statusCode){return res.status(error.statusCode).json({mensagem: error.message});}
        console.error(error);
        res.status(500).json({mensagem: "erro interno no servidor"});
    }
});

module.exports = router;