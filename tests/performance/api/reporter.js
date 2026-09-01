// tests/performance/api/reporter.js
// @ts-ignore
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

export function generateReports(data) {
  return {
    'report.html': htmlReport(data),
    'summary.json': JSON.stringify(data, null, 2),
  };
}
