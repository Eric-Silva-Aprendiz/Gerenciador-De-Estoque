const server = require('../app.js');
const request = require('supertest');

jest.setTimeout(50000)
let timer = setTimeout(()=>{},50000);
timer.unref()

let id;

describe("Testes de Produtos", () =>{
    it("Cadastro de produto", async() => {
        const response = await request(server)
            .post('/api/produto/')
            .send({
                nome: "TV",
                descricao: "aparelho televisivo",
                preco: 2000,
                quantidade: 200,
                categoria: "Eletronico",
                codigo_de_Barras: "1232646"
            })

            id = response.body.produto.id;            

        expect(response.status).toBe(201)
        expect(response.body.mensagem).toBe("Produto cadastrado com sucesso")
    })

    it("produto com codigo de barras duplicada", async() =>{
            const response = await request(server)
                .post('/api/produto/')
                .send({
                    nome: "TV",
                    descricao: "aparelho televisivo",
                    preco: 2000,
                    quantidade: 200,
                    categoria: "Eletronico",
                    codigo_de_Barras: "1232646"
                })                
            
            expect(response.status).toBe(409);
            expect(response.body.mensagem).toBe("Produto com este código de barras já está cadastrado");
        })
    
    it("Produto com dados inválidos", async() =>{
            const response = await request(server)
                .post(`/api/produto/`)
                .send({
                    nome: null,
                    descricao: null,
                    preco: null,
                    quantidade: null,
                    categoria: null,
                    codigo_de_Barras: null
                })
            
            expect(response.status).toBe(400);
            expect(response.body.mensagem).toBe("Dados inválidos ou inexistentes");
        })

    it("atualização de Produto", async() =>{
            const response = await request(server)
                .put(`/api/produto/${id}`)
                .send({
                    nome: "Radio",
                    descricao: "aparelho de radio",
                    preco: 1500,
                    quantidade: 200,
                    categoria: "Eletronico",
                    codigo_de_Barras: "19856646"                    
                })            

            console.log(response.body)
            
            expect(response.status).toBe(200);
            expect(response.body.mensagem).toBe("Produto atualizado com sucesso");
        })

    it("atualização de Produto com dados inválidos", async() =>{
            const response = await request(server)
                .put(`/api/produto/${id}`)
                .send({
                    nome: null,
                    descricao: null,
                    preco: null,
                    quantidade: null,
                    categoria: null,
                    codigo_de_Barras: null
                })
            
            expect(response.status).toBe(400);
            expect(response.body.mensagem).toBe("Dados inválidos ou inexistentes");
        })

    it("retornar produto", async() =>{
            const response = await request(server)
                .get(`/api/produto/${id}`)                
            
            expect(response.status).toBe(201);
            expect(response.body.produto.nome).toBe("Radio");
        })

    it("retornar produto inexistente", async() =>{
            const response = await request(server)
                .get(`/api/produto/${-1}`)                
            
            expect(response.status).toBe(404);
            expect(response.body.mensagem).toBe("Produto não encontrado");
        })

    it("retornar produto com id inválido", async() =>{
            const response = await request(server)
                .get(`/api/produto/${"A"}`)                
            
            expect(response.status).toBe(400);
            expect(response.body.mensagem).toBe("os Ids devem ser numéricos");
        })

    it("Deletar produto", async() =>{
            const response = await request(server)
                .delete(`/api/produto/${id}`)                
            
            expect(response.status).toBe(200);
            expect(response.body.mensagem).toBe("Produto deletado com sucesso");
        })

    it("Deletar produto inexistente", async() =>{
            const response = await request(server)
                .delete(`/api/produto/${-1}`)                
            
            expect(response.status).toBe(404);
            expect(response.body.mensagem).toBe("Produto não encontrado");
        })

    it("Deletar produto com id invalido", async() =>{
            const response = await request(server)
                .delete(`/api/produto/${"A"}`)                
            
            expect(response.status).toBe(400);
            expect(response.body.mensagem).toBe("os Ids devem ser numéricos");
        })
})