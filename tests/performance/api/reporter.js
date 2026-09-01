// @ts-check
// @ts-ignore
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
// @ts-ignore
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';

/**
 * Generates k6 HTML, JSON summaries, and formatted CLI stdout.
 * @param {object} data
 * @returns {Record<string, string>}
 */
export function generateReports(data) {
  return {
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
    'performance-report/report.html': htmlReport(data),
    'performance-report/summary.json': JSON.stringify(data, null, 2),
  };
}
