import http from 'k6/http';
import { sleep, check } from 'k6';
import { pegarBaseURL } from '../../utils/variaveis.js';

export const options = {
    stages: [
        { duration: '10s', target: 50 },
        { duration: '30s', target: 50 },
        { duration: '10s', target: 0 }
    ],
    thresholds: {
        http_req_duration: ['p(90)<3000', 'max<5000'],
        http_req_failed: ['rate<0.01']
    }
};

export default function () {
    const baseURL = pegarBaseURL();

    const scenarios = [
        '/api/places',
        '/api/places?type=Pet Shop',
        '/api/places?limit=5',
        '/api/places?type=Shopping&limit=3',
        '/api/places?type=Parque',
        '/api/places?limit=10'
    ];

    const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    const url = baseURL + randomScenario;

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const resposta = http.get(url, params);

    check(resposta, {
        'Status é 200': (r) => r.status === 200,
        'Response time < 2s': (r) => r.timings.duration < 2000,
        'Response sucesso é true': (r) => r.json('success') === true,
        'Response data é array': (r) => {
            const data = r.json('data');
            return Array.isArray(data); // permite array vazio
        },
        'Count é número': (r) => typeof r.json('count') === 'number'
    });

    sleep(1);
}
