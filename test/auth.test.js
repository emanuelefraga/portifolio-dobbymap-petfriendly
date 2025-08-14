const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const postAuthLogin = require('../fixtures/postAuthLogin.json');

describe('POST /auth/login', () => {
    it ('Deve retornar 200 quando usuário autenticado com sucesso', async () => {
        const bodyAuthLogin = { ...postAuthLogin };
        
        const resposta = await request(process.env.BASE_URL)
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send(bodyAuthLogin)
        expect(resposta.status).to.equal(200);
        expect(resposta.body.success).to.equal(true);
        expect(resposta.body.message).to.equal('Login realizado com sucesso');
        expect(resposta.body.token).to.be.a('string')
    })

    it ('Deve retornar 401 quando usuário não cadastrado no sistema', async () => {
        const bodyAuthLogin = { ...postAuthLogin };
        bodyAuthLogin.email = 'potter.harry@email.com'
        
        const resposta = await request(process.env.BASE_URL)
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send(bodyAuthLogin)
        expect(resposta.status).to.equal(401);
        expect(resposta.body.success).to.equal(false);
        expect(resposta.body.error).to.equal('Credenciais inválidas');
        expect(resposta.body.message).to.equal('Email não cadastrado no sistema')
        
    })

    it ('Deve retornar 401 quando usuário informar senha incorreta', async () => {
        const bodyAuthLogin = { ...postAuthLogin };
        bodyAuthLogin.password = "147542"
        
        const resposta = await request(process.env.BASE_URL)
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send(bodyAuthLogin)
        expect(resposta.status).to.equal(401);
        expect(resposta.body.success).to.equal(false);
        expect(resposta.body.error).to.equal('Credenciais inválidas');
        expect(resposta.body.message).to.equal('Senha incorreta para este email')
        
    })

    it ('Deve retornar 400 quando dados incompletos', async () => {
        const bodyAuthLogin = { ...postAuthLogin };
        bodyAuthLogin.password = ""
        
        const resposta = await request(process.env.BASE_URL)
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send(bodyAuthLogin)
        expect(resposta.status).to.equal(400);
        expect(resposta.body.success).to.equal(false);
        expect(resposta.body.error).to.equal('Dados obrigatórios não fornecidos');
        expect(resposta.body.message).to.equal('Email e senha são obrigatórios')
        
    })

})
