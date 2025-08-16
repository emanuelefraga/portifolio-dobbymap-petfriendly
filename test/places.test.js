const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { obterToken } = require('../helpers/autenticacao');
const postPlace = require('../fixtures/postPlaces.json');


    describe('GET /places/{id}', () => {
        it('Deve retornar 200 quando buscar as informações de todos os locais cadastrados no sistema', async () => {
                
            const resposta = await request(process.env.BASE_URL)
                .get('/api/places')
                .set('Content-Type', 'application/json')
            expect(resposta.status).to.equal(200);
            expect(resposta.body.success).to.equal(true);
            expect(resposta.body.data).to.be.a('array');
            expect(resposta.body.data[2].id).to.equal(3);
            expect(resposta.body.data[2].name).to.equal('Hogwarts');
            expect(resposta.body.data[2].type).to.equal('Parque');
        })

        it('Deve retornar 200 quando buscar por um local cadastrado no sistema', async () => {
            const id = 5;
                    
            const resposta = await request(process.env.BASE_URL)
                .get(`/api/places/${id}`)
                .set('Content-Type', 'application/json')
            expect(resposta.status).to.equal(200);
            expect(resposta.body.success).to.equal(true);
            expect(resposta.body.data).to.be.a('object');
            expect(resposta.body.data.id).to.equal(5);
            expect(resposta.body.data.name).to.equal('Praia Pet Feliz');
            expect(resposta.body.data.type).to.equal('Praia');
        })

        it('Deve retornar 404 quando buscar por um local não cadastrado no sistema', async () => {
            const id = 13;
                    
            const resposta = await request(process.env.BASE_URL)
                .get(`/api/places/${id}`)
                .set('Content-Type', 'application/json')
            expect(resposta.status).to.equal(404);
            expect(resposta.body.success).to.equal(false);
            expect(resposta.body.error).to.equal('Local não encontrado');
            expect(resposta.body.message).to.equal(`Local com ID ${id} não foi encontrado`);
        })

    })

describe('POST /places', () => {
        let token;

        beforeEach(async () => {
            token = await obterToken('manu.fraga@email.com', '123456');
        });

        it('Deve retornar 201 quando um local for cadastrado com sucesso', async () => {
            const bodyPlaces = { ...postPlace };
                
            const resposta = await request(process.env.BASE_URL)
                .post('/api/places')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyPlaces)
            expect(resposta.status).to.equal(201);
            expect(resposta.body.success).to.equal(true);
            expect(resposta.body.data).to.be.a('object');
        })
    })