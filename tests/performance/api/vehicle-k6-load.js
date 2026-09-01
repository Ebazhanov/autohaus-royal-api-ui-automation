import http from 'k6/http';
import { check, sleep } from 'k6';

// k6 load test configuration thresholds and scaling stages
export const options = {
  stages: [
    { duration: '30s', target: 20 }, // Ramp up to 20 virtual users
    { duration: '1m', target: 20 }, // Maintain steady load
    { duration: '10s', target: 0 }, // Ramp down to zero
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests must complete below 500ms
    http_req_failed: ['rate<0.01'], // Error rate must stay below 1%
  },
};

export default function () {
  // Execute HTTP GET request against the vehicles API target
  const response = http.get('https://autohaus-royal.de/api/vehicles');

  // Verify successful HTTP response status code
  check(response, {
    'status is 200': r => r.status === 200,
  });

  sleep(1);
}
