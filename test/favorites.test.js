const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { obterToken } = require('../helpers/autenticacao');
const { clearFavorites, initializeMockData } = require('../src/data/mockData');



describe('GET /users/{id}/favorites', () => {
    let token;

        beforeEach(async () => {
            token = await obterToken('manu.fraga@email.com', '123456');
        });

    it('Deve retornar 200 quando buscar os locais favoritos do usuário', async () => {
        const id = 1;

        const resposta = await request(process.env.BASE_URL)
            .get(`/api/users/${id}/favorites`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
        expect(resposta.status).to.equal(200);
        expect(resposta.body.success).to.equal(true);
        expect(resposta.body.data).to.be.a('array');
        expect(resposta.body.data[0].userId).to.equal(1);
        expect(resposta.body.data[0].placeId).to.equal(1);
        expect(resposta.body.data[0].place).to.be.a('object');
        expect(resposta.body.data[0].place.id).to.equal(1);
        expect(resposta.body.data[0].place.name).to.equal('O Beco Diagonal');
        expect(resposta.body.data[0].place.type).to.equal('Pet Shop');

    })

    it('Deve retornar 403 quando buscar os locais favoritos de outro usuário', async () => {
        const id = 2;

        const resposta = await request(process.env.BASE_URL)
            .get(`/api/users/${id}/favorites`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
        expect(resposta.status).to.equal(403);
        expect(resposta.body.success).to.equal(false);
        expect(resposta.body.error).to.equal('Acesso negado');
        expect(resposta.body.message).to.equal('Você só pode visualizar seus próprios favoritos');

    })
})

describe('POST /users/{id}/favorites/{placeId}', () => {
    let token;

        beforeEach(async () => {
            clearFavorites();
            initializeMockData();
            token = await obterToken('manu.fraga@email.com', '123456');
        });

    it('Deve retornar 201 quando cadastrar um novo local aos favoritos do usuário', async () => {
        const id = 1;
        const placeId = 8;

        const resposta = await request(process.env.BASE_URL)
            .post(`/api/users/${id}/favorites/${placeId}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
        expect(resposta.status).to.equal(201);
        expect(resposta.body.success).to.equal(true);
        expect(resposta.body.message).to.equal('Local adicionado aos favoritos com sucesso');
        
    })

    it('Deve retornar 403 quando cadastrar um novo local aos favoritos de outro usuário', async () => {
        const id = 5;
        const placeId = 8;

        const resposta = await request(process.env.BASE_URL)
            .post(`/api/users/${id}/favorites/${placeId}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
        expect(resposta.status).to.equal(403);
        expect(resposta.body.success).to.equal(false);
        expect(resposta.body.error).to.equal('Acesso negado');
        expect(resposta.body.message).to.equal('Você só pode modificar seus próprios favoritos');

    })
})
