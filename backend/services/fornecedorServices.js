const FornecedorDao = require("../dao/fornecedoresDao");
const errors = require("../errors/errors.js");

cnpjPréExistente = async (CNPJ) => {
    if(await FornecedorDao.findByCnpj(CNPJ)){return true} else {return false};
}; 

cadastrarFornecedor = async(objJSOM) =>{    
    if((!objJSOM.nome) ||  (!objJSOM.CNPJ) || (!objJSOM.telefone) || (!objJSOM.endereco) ||(!objJSOM.email) || (!objJSOM.nome_do_contato_principal)){
        throw new errors.BadRequest("Dados inválidos ou inexistentes");
    } if(await cnpjPréExistente(objJSOM.CNPJ)){
        throw new errors.ConflictError("Fornecedor com este CNPJ já está cadastrado");
    }else{        
        return await FornecedorDao.create(objJSOM);
    } 
};

atualizarFornecedor = async(objJSOM, id) =>{    

    if((!objJSOM.nome) ||  (!objJSOM.CNPJ) || (!objJSOM.telefone) || (!objJSOM.email) || (!objJSOM.nome_do_contato_principal)){
        throw new errors.BadRequest("Dados inválidos ou inexistentes");
    }if(await cnpjPréExistente(objJSOM.codigo_de_Barras)){
        throw new errors.ConflictError("Fornecedor com este CNPJ já está cadastrado");
    }else{        
        await retornarFornecedor(id);
        return await FornecedorDao.update(objJSOM, id);
    }     
};

deletarFornecedor = async(id) =>{
    if((!id) || (!Number.isInteger(id))){
        throw new errors.BadRequest("os Ids devem ser numéricos");
    } 

    await retornarFornecedor(id);
    return await FornecedorDao.delete(id);        
};

retornarFornecedor = async(id) =>{
    if((!id) || (!Number.isInteger(id))){
        throw new errors.BadRequest("os Ids devem ser numéricos");
    } 
    let fornecedor = await FornecedorDao.find(id);
    if(!fornecedor){
        throw new errors.NotFoundError("fornecedor não encontrado");
    }else{
        return fornecedor;
    }
};



module.exports = {
    cadastrarFornecedor,
    atualizarFornecedor,
    deletarFornecedor,
    retornarFornecedor
}