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
    http_req_duration: ['p(95)<1000'], // 95% of requests under 1s
    http_req_failed: ['rate<0.05'], // Failures below 5%
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
  });

  sleep(1);
}

export function handleSummary(data) {
  return generateReports(data);
}
