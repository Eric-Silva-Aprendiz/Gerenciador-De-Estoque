const db = require("../models/index")

class FornecedorDao {
    create = async (objJSOM) => {
        const t = await db.sequelize.transaction();
            try {
                let fornecedor = await db.Fornecedores.create(objJSOM, {transaction: t});
                t.afterCommit(() =>{
                    console.log();
                    console.log("fornecedor cadastrado");
                    console.log();
                })
                await t.commit();
                return fornecedor;
            } catch (error) {
                await t.rollback(); 
                throw error;                           
            }
    }

    update = async(objJSOM, _id) => {
        const t = await db.sequelize.transaction();
        try {
            let fornecedor = await db.Fornecedores.update(objJSOM, {where:{id: _id}, individualHooks: true ,transaction: t});
            t.afterCommit(() =>{
                console.log();
                console.log("fornecedor atualizado");
                console.log();
            })
            await t.commit();
            return fornecedor;
        } catch (error) {
            await t.rollback(); 
            throw error;           
        }
    }
    
    delete = async(_id) =>{
            const t = await db.sequelize.transaction();
            try {
                let fornecedor = await db.Fornecedores.destroy({where:{id: _id}, individualHooks: true, transaction: t});
                t.afterCommit(() =>{
                    console.log();
                    console.log("fornecedor deletado");
                    console.log();
                })
                await t.commit()
                return fornecedor;
            } catch (error) {
                await t.rollback();
                throw error;
            }    
    }
    
    find = async(_id) =>{
            return await db.Fornecedores.findOne({where: {id: _id}});
    }

    findByCnpj = async(_CNPJ) =>{
        return await db.Fornecedores.findOne({where: {CNPJ: _CNPJ}})
    }
}


module.exports = new FornecedorDao();