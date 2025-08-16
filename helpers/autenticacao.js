const request = require('supertest');
const postAuthLogin = require('../fixtures/postAuthLogin.json');

const obterToken = async () => {
    const respostaLogin = await request(process.env.BASE_URL)
        .post('/api/auth/login')
        .set('Content-Type', 'application/json')
        .send(postAuthLogin);
     
    if (!respostaLogin.body.token) {
        console.error('Erro ao obter token:', respostaLogin.body);
        throw new Error('Não foi possível autenticar');
    }

    return respostaLogin.body.token;
};

module.exports = { obterToken };