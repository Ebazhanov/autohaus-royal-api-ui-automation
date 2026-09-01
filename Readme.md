## Autohaus Royal Hybrid Test Automation Framework (UI + API + Performance)

A hybrid test suite combining **Playwright (TypeScript)** E2E/API automation with **k6** load testing for the Autohaus Royal vehicle portal.

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