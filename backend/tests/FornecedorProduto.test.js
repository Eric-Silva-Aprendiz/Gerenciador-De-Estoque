const server = require('../app.js');
const request = require('supertest');

jest.setTimeout(50000)
let timer = setTimeout(()=>{},50000);
timer.unref()

let idFornecedor;
let idProduto;

beforeAll(async()=>{
    const responseFornecedor = await request(server)
                .post('/api/fornecedor/')
                .send({
                    nome: "Carrefur",
                    CNPJ: "123825134",
                    endereco: "mg34 norte",
                    telefone: "(61) 99032-1221",
                    email: "MagazineOficial@gmail.com",
                    nome_do_contato_principal: "Huarez"
                })
    
            idFornecedor = responseFornecedor.body.fornecedor.id;
        
    const responseProduto = await request(server)
                .post('/api/produto/')
                .send({
                    nome: "Som",
                    descricao: "aparelho de som",
                    preco: 2000,
                    quantidade: 200,
                    categoria: "Eletronico",
                    codigo_de_Barras: "43256432"
                })
    
                idProduto = responseProduto.body.produto.id;                                
})

afterAll(async() =>{
    const responseProduto = await request(server)        
        .delete(`/api/produto/${idProduto}`)
    
    const responseFornecedor = await request(server)
       .delete(`/api/fornecedor/${idFornecedor}`)    
})

describe('Testes de associações', () =>{
    it("Cadastro de associacao", async() =>{
        const response = await request(server)
            .post('/api/associacao/')
            .send({
                id_fornecedor: idFornecedor,
                nome_fornecedor: "Carrefur",
                id_produto: idProduto,
                nome_produto: "Som"
            })

        idFornecedor = response.body.associacao.id_fornecedor;
        idProduto = response.body.associacao.id_produto;
        
        

        expect(response.status).toBe(201);
        expect(response.body.mensagem).toBe("Fornecedor associado com sucesso ao produto")
    })

    it("associacao pre existente", async() =>{
        const response = await request(server)
            .post('/api/associacao/')
            .send({
                id_fornecedor: idFornecedor,
                nome_fornecedor: "Carrefur",
                id_produto: idProduto,
                nome_produto: "Som"
            })
        
        expect(response.status).toBe(409);
        expect(response.body.mensagem).toBe("Esse fornecedor já está associado a este produto");
    })

    it("associacao com dados inválidos", async() =>{
        const response = await request(server)
            .post('/api/associacao/')
            .send({
                id_fornecedor: null,
                nome_fornecedor: null,
                id_produto: null,
                nome_produto: null
            })
        
        expect(response.status).toBe(400);
        expect(response.body.mensagem).toBe("Dados inválidos ou inexistentes");
    })

    it("retornar associacao", async() =>{
            const response = await request(server)
                .get(`/api/associacao/${idFornecedor}/${idProduto}`)                            

            expect(response.status).toBe(201);
            expect(response.body.associacao.nome_fornecedor).toBe("Carrefur");
    })

    it("retornar associacao inexistente", async() =>{
            const response = await request(server)
                .get(`/api/associacao/${-1}/${-1}`)                
            
            expect(response.status).toBe(404);
            expect(response.body.mensagem).toBe("associação não encontrada");
        })

    it("retornar associacao com id inválido", async() =>{
            const response = await request(server)
                .get(`/api/associacao/${"A"}/${"B"}`)                
            
            expect(response.status).toBe(400);
            expect(response.body.mensagem).toBe("os Ids devem ser numéricos");
    })

    it("Deletar associacao", async() =>{
            const response = await request(server)
                .delete(`/api/associacao/${idFornecedor}/${idProduto}`)                
            
            expect(response.status).toBe(200);
            expect(response.body.mensagem).toBe("Associação deletada com sucesso");
        })

    it("Deletar associacao inexistente", async() =>{
            const response = await request(server)
                .delete(`/api/associacao/${-1}/${-1}`)                
            
            expect(response.status).toBe(404);
            expect(response.body.mensagem).toBe("associação não encontrada");
        })

    it("Deletar associacao com id invalido", async() =>{
            const response = await request(server)
                .delete(`/api/associacao/${"A"}/${"B"}`)                
            
            expect(response.status).toBe(400);
            expect(response.body.mensagem).toBe("os Ids devem ser numéricos");
        })
}) 