const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const postUsers = require('../fixtures/postUsers.json');

describe('GET /users', () => {
    it('Deve retornar 200 quando buscar as informações de todos os usuários cadastrados no sistema', async () => {
        
        const resposta = await request(process.env.BASE_URL)
            .get('/api/users')
            .set('Content-Type', 'application/json')
        expect(resposta.status).to.equal(200);
        expect(resposta.body.success).to.equal(true);
        expect(resposta.body.data).to.be.a('array');
        expect(resposta.body.data[0].id).to.be.a('number');
        expect(resposta.body.data[0].name).to.be.a('string');
        expect(resposta.body.data[0].email).to.be.a('string');
        expect(resposta.body.data[0].password).to.be.a('string');
        expect(resposta.body.data[0].pet).to.be.a('object');
        expect(resposta.body.data[0].pet.name).to.be.a('string');
        expect(resposta.body.data[0].pet.type).to.be.a('string');
        expect(resposta.body.data[0].pet.breed).to.be.a('string');
    })

})

describe('POST /users', () => {
    it('Deve retornar 201 quando um usuário for cadastrado com sucesso', async () => {
        const bodyUsers = { ...postUsers };
        
        const resposta = await request(process.env.BASE_URL)
            .post('/api/users')
            .set('Content-Type', 'application/json')
            .send(bodyUsers)
        expect(resposta.status).to.equal(201);
        expect(resposta.body.success).to.equal(true);
        expect(resposta.body.message).to.equal('Usuário criado com sucesso');
        expect(resposta.body.id).to.be.a('number');
    })

    it('Deve retornar 400 quando dados do usuário incompletos', async () => {
        const bodyUsers = { ...postUsers };
        bodyUsers.name = ''
        
        const resposta = await request(process.env.BASE_URL)
            .post('/api/users')
            .set('Content-Type', 'application/json')
            .send(bodyUsers)
        expect(resposta.status).to.equal(400);
        expect(resposta.body.success).to.equal(false);
        expect(resposta.body.error).to.equal('Dados obrigatórios não fornecidos');
        expect(resposta.body.message).to.equal('Nome, email, senha e informações do pet são obrigatórios');
    })

    it('Deve retornar 400 quando caracteres de senha com mais ou menos que 6 dígitos', async () => {
        const bodyUsers = { ...postUsers };
        bodyUsers.password = '1234567'
        
        const resposta = await request(process.env.BASE_URL)
            .post('/api/users')
            .set('Content-Type', 'application/json')
            .send(bodyUsers)
        expect(resposta.status).to.equal(400);
        expect(resposta.body.success).to.equal(false);
        expect(resposta.body.error).to.equal('Senha inválida');
        expect(resposta.body.message).to.equal('A senha deve conter exatamente 6 dígitos numéricos');
    })

    it('Deve retornar 400 quando senha não numérica', async () => {
        const bodyUsers = { ...postUsers };
        bodyUsers.password = 'abcdef'
        
        const resposta = await request(process.env.BASE_URL)
            .post('/api/users')
            .set('Content-Type', 'application/json')
            .send(bodyUsers)
        expect(resposta.status).to.equal(400);
        expect(resposta.body.success).to.equal(false);
        expect(resposta.body.error).to.equal('Senha inválida');
        expect(resposta.body.message).to.equal('A senha deve conter exatamente 6 dígitos numéricos');
    })

    it('Deve retornar 400 quando dados do pet incompletos', async () => {
        const bodyUsers = { ...postUsers };
        bodyUsers.pet.name = ''
        
        const resposta = await request(process.env.BASE_URL)
            .post('/api/users')
            .set('Content-Type', 'application/json')
            .send(bodyUsers)
        expect(resposta.status).to.equal(400);
        expect(resposta.body.success).to.equal(false);
        expect(resposta.body.error).to.equal('Dados do pet incompletos');
        expect(resposta.body.message).to.equal('Nome, tipo e raça do pet são obrigatórios');
    })

    it("Deve retornar 400 ao tentar cadastrar um usuário já existente no sistema", async () => {
        const bodyUsers = {
            name: 'Ron Weasley',
            email: 'ron.weasley@email.com',
            password: '123456',
            pet: {
            name: 'Perebas',
            type: 'Gato',
            breed: 'Persa'
            }
        };
        const resposta = await request(process.env.BASE_URL)
            .post('/api/users')
            .set('Content-Type', 'application/json')
            .send(bodyUsers)
        expect(resposta.status).to.equal(400);
        expect(resposta.body.success).to.equal(false);
        expect(resposta.body.error).to.equal('Usuário já existe');
        expect(resposta.body.message).to.equal('E-mail já cadastrado no sistema');
    })


})

describe('GET /users{id}', () => {
    it('Deve retornar 200 quando buscar por um usuário existente', async () => {
        const id = 1;
        
        const resposta = await request(process.env.BASE_URL)
            .get(`/api/users/${id}`)
            .set('Content-Type', 'application/json')
        expect(resposta.status).to.equal(200);
        expect(resposta.body.success).to.equal(true);
        expect(resposta.body.data).to.be.a('object');
        expect(resposta.body.data.id).to.equal(1);
        expect(resposta.body.data.name).to.equal('Manu Fraga');
        expect(resposta.body.data.email).to.equal('manu.fraga@email.com');
        expect(resposta.body.data.password).to.equal('123456');
        expect(resposta.body.data.pet).to.be.a('object');
        expect(resposta.body.data.pet.name).to.equal('Dobby');
        expect(resposta.body.data.pet.type).to.equal('Cachorro');
        expect(resposta.body.data.pet.breed).to.equal('Shitzu');
    })

    it('Deve retornar 404 quando buscar por um usuário inexistente', async () => {
        const id = 123;
        
        const resposta = await request(process.env.BASE_URL)
            .get(`/api/users/${id}`)
            .set('Content-Type', 'application/json')
        expect(resposta.status).to.equal(404);
        expect(resposta.body.success).to.equal(false);
        expect(resposta.body.error).to.equal('Usuário não encontrado');
        expect(resposta.body.message).to.equal(`Usuário com ID ${id} não foi encontrado`);
    })


})
