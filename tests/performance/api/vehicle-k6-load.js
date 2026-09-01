import http from 'k6/http';
import { check, sleep } from 'k6';
import { generateReports } from './reporter.js';

export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m', target: 20 },
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<1000'], // 95% запросов быстрее 1000мс
    http_req_failed: ['rate<0.05'], // Ошибок менее 5%
  },
};

export default function () {
  const BASE_URL = __ENV.BASE_URL || 'https://autohaus-royal.de';

  const response = http.get(`${BASE_URL}/`, {
    headers: {
      Accept: 'text/html,application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
  });

  check(response, {
    'status is 200': r => r.status === 200,
    'response time < 1000ms': r => r.timings.duration < 1000,
  });

  sleep(1);
}

export function handleSummary(data) {
  return generateReports(data);
}
