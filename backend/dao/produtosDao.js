const db = require("../models/index");

class ProdutoDao{
    create = async(objJSOM) =>{
        const t = await db.sequelize.transaction();
        try {
            let produto = await db.Produtos.create(objJSOM, {transaction: t});
            t.afterCommit(() =>{
                console.log();
                console.log("Produto cadastrado");
                console.log();
            })
            await t.commit();
            return produto;
        } catch (error) {            
            await t.rollback();      
            throw error;     
        }
    }

    update = async(objJSOM, _id) => {
        const t = await db.sequelize.transaction();
        try {
            let produto = await db.Produtos.update(objJSOM, {where:{id: _id}, individualHooks: true ,transaction: t});
            t.afterCommit(() =>{
                console.log();
                console.log("produto atualizado");
                console.log();
            })
            await t.commit();
            return produto;
        } catch (error) {
            await t.rollback(); 
            throw error;           
        }
    }

    delete = async(_id) =>{
        const t = await db.sequelize.transaction();
        try {
            let produto = await db.Produtos.destroy({where:{id: _id}, individualHooks: true, transaction: t});
            t.afterCommit(() =>{
                console.log();
                console.log("produto deletado");
                console.log();
            })
            await t.commit()
            return produto;
        } catch (error) {
            await t.rollback();
            throw error;
        }    
    }

    find = async(_id) =>{
        return await db.Produtos.findOne({where: {id: _id}});
    } 
    
    findCodigoDeBarras = async(_codigoDeBarras) => {
        return await db.Produtos.findOne({where:{codigo_de_barras: _codigoDeBarras}});
    }
}

module.exports = new ProdutoDao();