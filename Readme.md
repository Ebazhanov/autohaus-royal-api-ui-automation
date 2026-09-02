## Autohaus Royal Hybrid Test Automation Framework (UI + API + Performance)

A hybrid test suite combining **Playwright (TypeScript)** E2E/API automation with **k6** load testing for the Autohaus Royal vehicle portal.

[![CI (Functional)](https://github.com/Ebazhanov/autohaus-royal-api-ui-automation/actions/workflows/ci.yml/badge.svg)](https://github.com/Ebazhanov/autohaus-royal-api-ui-automation/actions/workflows/ci.yml)
[![Performance & Load Tests](https://github.com/Ebazhanov/autohaus-royal-api-ui-automation/actions/workflows/performance.yml/badge.svg)](https://github.com/Ebazhanov/autohaus-royal-api-ui-automation/actions/workflows/performance.yml)

---

## 🎯 Test Scenarios

- [x] **Vehicle Data Consistency**
  - Validates that vehicle attributes (ID, Manufacturer, Price, Km, Fuel) match between live backend API responses and rendered UI elements.
  - Priority checks: Manufacturer, Price, Mileage (Km), Fuel type, and API/UI contract validation.
- [x] **UI Performance Benchmarks (Core Web Vitals)**
  - Measures Navigation Timing and Core Web Vitals (DOMContentLoaded, Page Load Time, FCP) directly within Playwright runs.
- [x] **API Load & Performance Testing (k6)**
  - Executes load testing scenarios, SLA threshold verifications (`p(95) < 1000ms`, `failure < 5%`), and exports dual HTML/JSON reports using **k6**.
- [ ] **Inquiry Form Submission**
  - Submits the vehicle inquiry form via UI and asserts outgoing network payload correctness and validation handling.
- [ ] **State Mocks & Edge Cases**
  - Mocks dynamic pricing and availability statuses via network route overrides to exercise edge cases and error handling.

---

## 🛠️ Prerequisites & Setup

* **Node.js:** `>=18`
* **k6:** Installed globally (`brew install k6` on macOS or via package manager)

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright browser binaries
npm run prepare
```
----

## ⚡ Performance Metrics Summary

| Metric | Target / SLA | Description |
| :--- | :--- | :--- |
| **p(95) Latency** | `< 1000 ms` | Ensures 95% of users receive responses in under 1 second |
| **Avg Latency** | Baseline | Tracks overall average backend response time |
| **Failure Rate** | `< 5%` | Verifies HTTP status error rate remains near 0% under load |
| **Web Vitals** | Optimal | Measures page load, DOM Content Loaded, and FCP rendering times |

----

## Bug Reports Summary

### Functional Testing
* [Func] [Sev: High | P: High] Contact form lacks validation error triggers for invalid inputs
* [Func] [Sev: Med | P: Med] Vehicle search filter lacks a 'Reset Filters' control button
* [Func] [Sev: Med | P: Med] Empty filter results lack 'No cars found' message
* [Func] [Sev: Med | P: Med] Catalog filter update lacks asynchronous loading spinner feedback

### UX / Usability Testing
* [UX] [Sev: Low | P: Low] Weak visual contrast for the active navigation menu item
* [UX] [Sev: Med | P: Med] Unclickable social media and external partner icons in footer
* [UX] [Sev: Med | P: Med] Messy specifications layout on vehicle detail page
* [UX] [Sev: Med | P: Med] Filter interaction triggers layout flash without a loading indicator

### Compatibility Testing (UI / Layout)
* [UI] [Sev: Med | P: Med] Vehicle model titles cropped in catalog card headers

### Performance & Speed Testing
* [Perf] [Sev: Low | P: Low] Duplicate 'group.php' POST requests fired on initial page load
* [Perf] [Sev: Med | P: Med] Long network delay during initial Google Maps API requests

### Security Testing
* [Security] [Sev: Med | P: High] Empty 'x-goog-api-key' header sent in Google Places API request
> ⚠️ **SECURITY WARNING**  
* [Security] [Sev: High | P: High] Unrestricted API Data Exposure**  
> The backend endpoint dumps a raw database dictionary containing over 60,000 JSON lines on initial page load.  
> 🔗 **Relevant Spec:** [`tests/autohaus.spec.ts`](./tests/api/catalog-dumper.spec.ts)

### Content & SEO Testing
* [SEO] [Sev: Med | P: Low] Missing Open Graph ('og:*') tags prevent social link previews
* [SEO] [Sev: Low | P: Low] Empty 'description' meta tag content attribute in HTML head
* [Content] [Sev: Low | P: Low] Attribute lists display raw concatenated strings without space delimiters