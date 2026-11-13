const db = require("../models/index")

class Fornecedor_ProdutoDao {
    create = async (objJSOM) => {
        const t = await db.sequelize.transaction();
            try {
                let associaçao = await db.Fornecedor_Produto.create(objJSOM, {transaction: t});
                t.afterCommit(() =>{
                    console.log();
                    console.log("fornecimento cadastrado");
                    console.log();
                })
                await t.commit();
                return associaçao;
            } catch (error) {
                await t.rollback();  
                throw error;          
            }
    }

    update = async(objJSOM, _id_fornecedor, _id_produto) => {
        const t = await db.sequelize.transaction();
        try {
            let associaçao = await db.Fornecedor_Produto.update(objJSOM, {where:{id_fornecedor: _id_fornecedor, id_produto: _id_produto}, individualHooks: true ,transaction: t});
            t.afterCommit(() =>{
                console.log();
                console.log("fornecimento atualizado");
                console.log();
            })
            await t.commit();
            return associaçao;
        } catch (error) {
            await t.rollback();
            throw error;            
        }
    }
    
    delete = async(_id_fornecedor, _id_produto) =>{
            const t = await db.sequelize.transaction();
            try {
                let associaçao = await db.Fornecedor_Produto.destroy({where:{id_fornecedor: _id_fornecedor, id_produto: _id_produto}, individualHooks: true, transaction: t});
                t.afterCommit(() =>{
                    console.log();
                    console.log("fornecimento deletado");
                    console.log();
                })
                await t.commit()
                return associaçao;
            } catch (error) {
                await t.rollback();
                throw error;
            }    
    }
    
    find = async(_id_fornecedor, _id_produto) =>{
            return await db.Fornecedor_Produto.findOne({where:{id_fornecedor: _id_fornecedor, id_produto: _id_produto}});
    }
}

module.exports = new Fornecedor_ProdutoDao();