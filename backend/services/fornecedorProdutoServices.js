const FornecedorProdutoDao = require("../dao/fornecedorProdutoDao.js");
const errors = require("../errors/errors.js");


cadastrarAssociacao = async(objJSOM) =>{    
    if((!objJSOM.id_fornecedor), (!Number.isInteger(objJSOM.id_fornecedor)), (!objJSOM.nome_fornecedor), (!objJSOM.id_produto), (!Number.isInteger(objJSOM.id_produto)), (!objJSOM.nome_produto)){
        throw new errors.BadRequest("Dados inválidos ou inexistentes");
    } if(await FornecedorProdutoDao.find(objJSOM.id_fornecedor, objJSOM.id_produto)){
        throw new errors.ConflictError("Esse fornecedor já está associado a este produto");
    }else{        
        return await FornecedorProdutoDao.create(objJSOM);
    } 
};

atualizarAssociacao = async(objJSOM) =>{    
    if((!objJSOM.id_fornecedor), (!objJSOM.nome_fornecedor), (!objJSOM.id_produto), (!objJSOM.nome_produto)){
        throw new errors.BadRequest("Dados inválidos ou inexistentes");
    }if(await FornecedorProdutoDao.find(objJSOM.id_fornecedor, objJSOM.id_produto)){
        throw new errors.ConflictError("Esse fornecedor já está associado a este produto");
    }else{        
        await retornarAssociacao(objJSOM.id_fornecedor, objJSOM.id_produto);
        return await FornecedorProdutoDao.update(objJSOM, objJSOM.id_fornecedor, objJSOM.id_produto);
    }     
};

deletarAssociacao = async(id_fornecedor, id_produto) =>{
    if((!id_fornecedor) || (!Number.isInteger(id_fornecedor)) || (!id_produto) || (!Number.isInteger(id_produto))){
        throw new errors.BadRequest("os Ids devem ser numéricos");
    } 

    await retornarAssociacao(id_fornecedor, id_produto);
    return await FornecedorProdutoDao.delete(id_fornecedor, id_produto);        
};

retornarAssociacao = async(id_fornecedor, id_produto) =>{
    if((!id_fornecedor) || (!Number.isInteger(id_fornecedor)) || (!id_produto) || (!Number.isInteger(id_produto))){
        throw new errors.BadRequest("os Ids devem ser numéricos");
    } 
    let associacao = await FornecedorProdutoDao.find(id_fornecedor, id_produto);
    if(!associacao){
        throw new errors.NotFoundError("associação não encontrada");
    }else{
        return associacao;
    }
};



module.exports = {
    cadastrarAssociacao,
    atualizarAssociacao,
    deletarAssociacao,
    retornarAssociacao
}