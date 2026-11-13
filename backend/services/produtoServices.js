const ProdutosDao = require("../dao/produtosDao");
const errors = require("../errors/errors.js");

codigoDeBarrasPréExistente = async (codigoDeBarras) => {
    if(await ProdutosDao.findCodigoDeBarras(codigoDeBarras)){return true} else {return false};
}

cadastrarProduto = async(objJSOM) =>{    
    if((!objJSOM.nome) || (!objJSOM.descricao) || (!objJSOM.categoria) || (!objJSOM.codigo_de_Barras)){
        throw new errors.BadRequest("Dados inválidos ou inexistentes");
    } if(await codigoDeBarrasPréExistente(objJSOM.codigo_de_Barras)){
        throw new errors.ConflictError("Produto com este código de barras já está cadastrado");
    }else if((objJSOM.categoria == "alimentos") && (!objJSOM.data_de_validade)){
        throw new errors.BadRequest("Defina uma data de validade");    
    }else{        
        return await ProdutosDao.create(objJSOM);
    } 
};

atualizarProduto = async(objJSOM, id) =>{
    console.log(objJSOM)
    console.log((!objJSOM.nome), (!objJSOM.descricao), (!objJSOM.categoria), (!objJSOM.codigo_de_Barras))


    if((!objJSOM.nome) || (!objJSOM.descricao) || (!objJSOM.categoria) || (!objJSOM.codigo_de_Barras)){
        throw new errors.BadRequest("Dados inválidos ou inexistentes");
    }if(await codigoDeBarrasPréExistente(objJSOM.codigo_de_Barras)){
        throw new errors.ConflictError("Produto com este código de barras já está cadastrado");
    }else if((objJSOM.categoria == "alimentos") && (!objJSOM.data_de_validade)){
        throw new errors.BadRequest("Defina uma data de validade");    
    }else{        
        await retornarProduto(id);
        return await ProdutosDao.update(objJSOM, id);
    }     
};

deletarProduto = async(id) =>{
    if((!id) || (!Number.isInteger(id))){
        throw new errors.BadRequest("os Ids devem ser numéricos");
    } 

    await retornarProduto(id);
    return await ProdutosDao.delete(id);        
}

retornarProduto = async(id) =>{
    if((!id) || (!Number.isInteger(id))){
        throw new errors.BadRequest("os Ids devem ser numéricos");
    } 
    let produto = await ProdutosDao.find(id);
    if(!produto){
        throw new errors.NotFoundError("Produto não encontrado");
    }else{
        return produto;
    }
}



module.exports = {
    cadastrarProduto,
    atualizarProduto,
    deletarProduto,
    retornarProduto
}