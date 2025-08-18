const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { obterToken } = require('../helpers/autenticacao');
const { clearReviews, initializeMockData } = require('../src/data/mockData');
const postReviews = require('../fixtures/postReviews.json');


describe('GET /places/{id}/reviews', () => {

    it('Deve retornar 200 quando buscar as avaliações de um local específico', async () => {
        const id = 3;
                
        const resposta = await request(process.env.BASE_URL)
            .get(`/api/places/${id}/reviews`)
            .set('Content-Type', 'application/json')
        expect(resposta.status).to.equal(200);
        expect(resposta.body.success).to.equal(true);
        expect(resposta.body.data).to.be.a('array');
        expect(resposta.body.data[0].id).to.equal(4);
        expect(resposta.body.data[0].userId).to.equal(4);
        expect(resposta.body.data[0].placeId).to.equal(3);
        expect(resposta.body.data[0].rating).to.equal(4);
        expect(resposta.body.data[0].comment).to.equal('Parque lindo e muito bem cuidado para pets.');
        expect(resposta.body.data[0].createdAt).to.be.a('string');
        expect(resposta.body.count).to.be.a('number');
    })

    it('Deve retornar 404 quando buscar as avaliações de um local não cadastrado no sistema', async () => {
        const id = 25;
                
        const resposta = await request(process.env.BASE_URL)
            .get(`/api/places/${id}/reviews`)
            .set('Content-Type', 'application/json')
        expect(resposta.status).to.equal(404);
        expect(resposta.body.success).to.equal(false);
        expect(resposta.body.error).to.equal('Local não encontrado');
        expect(resposta.body.message).to.equal(`Local com ID ${id} não foi encontrado`);
    })
})

describe('POST /places/{id}/reviews', () => {
    let token;

    beforeEach(async () => {
        clearReviews();
        initializeMockData();
        token = await obterToken('manu.fraga@email.com', '123456');
    });

    it('Deve retornar 201 quando um local for avaliado com sucesso', async () => {
        const placeId = 3;
        const timestamp = Date.now();
        const bodyReviews = {
            ...postReviews,
            comment: `${postReviews.comment} ${timestamp}`
        };
            
        const resposta = await request(process.env.BASE_URL)
            .post(`/api/places/${placeId}/reviews`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(bodyReviews)
        expect(resposta.status).to.equal(201);
        expect(resposta.body.success).to.equal(true);
        expect(resposta.body.message).to.equal('Avaliação criada com sucesso');
        expect(resposta.body.data).to.be.a('object');
        expect(resposta.body.data.userId).to.equal(1);
        expect(resposta.body.data.placeId).to.equal(`${placeId}`);
        expect(resposta.body.data.rating).to.equal(bodyReviews.rating);
        expect(resposta.body.data.comment).to.equal(bodyReviews.comment);
        expect(resposta.body.data.id).to.be.a('number');
        expect(resposta.body.data.createdAt).to.be.a('string');

    })

    it('Deve retornar 400 quando dados obrigatórios não forem fornecidos', async () => {
        const placeId = 3;
        const bodyReviews = {
            rating: postReviews.rating
            // comment está faltando
        };
            
        const resposta = await request(process.env.BASE_URL)
            .post(`/api/places/${placeId}/reviews`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(bodyReviews)
        expect(resposta.status).to.equal(400);
        expect(resposta.body.success).to.equal(false);
        expect(resposta.body.error).to.equal('Dados obrigatórios não fornecidos');
        expect(resposta.body.message).to.equal('Nota e comentário são obrigatórios');
    })

     it('Deve retornar 401 quando token não for fornecido', async () => {
        const placeId = 5;
         const bodyReviews = {
             ...postReviews
         };
            
         const resposta = await request(process.env.BASE_URL)
             .post(`/api/places/${placeId}/reviews`)
             .set('Content-Type', 'application/json')
             .send(bodyReviews)
         expect(resposta.status).to.equal(401);
     })
})