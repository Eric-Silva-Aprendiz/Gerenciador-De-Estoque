const server = require('../app.js');
const request = require('supertest');

jest.setTimeout(50000)
let timer = setTimeout(()=>{},50000);
timer.unref()

let id;

describe('Testes de fornecedores', () =>{
    it("Cadastro de fornecedor", async() =>{
        const response = await request(server)
            .post('/api/fornecedor/')
            .send({
                nome: "Magazine Luiza",
                CNPJ: "12542134",
                endereco: "mg34 norte",
                telefone: "(61) 99032-1221",
                email: "MagazineOficial@gmail.com",
                nome_do_contato_principal: "Huarez"
            })

        id = response.body.fornecedor.id;
        
        expect(response.status).toBe(201);
        expect(response.body.mensagem).toBe("Fornecedor cadastrado com sucesso")
    })

    it("Fornecedor com CNPJ duplicada", async() =>{
        const response = await request(server)
            .post('/api/fornecedor/')
            .send({
                nome: "Magazine Luiza",
                CNPJ: "12542134",
                endereco: "mg34 norte",                
                telefone: "(61) 99032-1221",
                email: "MagazineOficial@gmail.com",
                nome_do_contato_principal: "Huarez"
            })
        
        expect(response.status).toBe(409);
        expect(response.body.mensagem).toBe("Fornecedor com este CNPJ já está cadastrado");
    })

    it("Fornecedor com dados inválidos", async() =>{
        const response = await request(server)
            .post('/api/fornecedor/')
            .send({
                nome: null,
                CNPJ: null,
                emdereco: null,
                telefone: null,
                email: null,
                nome_do_contato_principal: null
            })
        
        expect(response.status).toBe(400);
        expect(response.body.mensagem).toBe("Dados inválidos ou inexistentes");
    })

    it("retornar fornecedor", async() =>{
            const response = await request(server)
                .get(`/api/fornecedor/${id}`)                
            
        console.log(response.body)

            expect(response.status).toBe(201);
            expect(response.body.fornecedor.nome).toBe("Magazine Luiza");
    })

    it("retornar fornecedor inexistente", async() =>{
            const response = await request(server)
                .get(`/api/fornecedor/${-1}`)                
            
            expect(response.status).toBe(404);
            expect(response.body.mensagem).toBe("fornecedor não encontrado");
        })

    it("retornar fornecedor com id inválido", async() =>{
            const response = await request(server)
                .get(`/api/fornecedor/${"A"}`)                
            
            expect(response.status).toBe(400);
            expect(response.body.mensagem).toBe("os Ids devem ser numéricos");
    })

    it("Deletar fornecedor", async() =>{
            const response = await request(server)
                .delete(`/api/fornecedor/${id}`)                
            
            expect(response.status).toBe(200);
            expect(response.body.mensagem).toBe("Fornecedor deletado com sucesso");
        })

    it("Deletar fornecedor inexistente", async() =>{
            const response = await request(server)
                .delete(`/api/fornecedor/${-1}`)                
            
            expect(response.status).toBe(404);
            expect(response.body.mensagem).toBe("fornecedor não encontrado");
        })

    it("Deletar fornecedor com id invalido", async() =>{
            const response = await request(server)
                .delete(`/api/fornecedor/${"A"}`)                
            
            expect(response.status).toBe(400);
            expect(response.body.mensagem).toBe("os Ids devem ser numéricos");
        })
}) 