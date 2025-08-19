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
    const baseURL = pegarBaseURL() + '/api/places';

    const scenarios = [
        baseURL,                                
        `${baseURL}?type=Parque`,             
        `${baseURL}?limit=5`                   

    ];

    const url = scenarios[Math.floor(Math.random() * scenarios.length)];

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const resposta = http.get(url, params);

    check(resposta, {
        'Status é 200': (r) => r.status === 200
    });

    sleep(1);
}
