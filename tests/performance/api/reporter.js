// @ts-check
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

/**
 * Generates k6 HTML and JSON summaries inside the performance-report folder.
 * @param {object} data
 * @returns {Record<string, string>}
 */
export function generateReports(data) {
  return {
    'performance-report/report.html': htmlReport(data),
    'performance-report/summary.json': JSON.stringify(data, null, 2),
  };
}
