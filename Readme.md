## Autohaus Royal Hybrid Test Automation Framework (UI + API)

A hybrid test suite combining **Playwright (TypeScript)** UI automation with direct API validation for the Autohaus Royal vehicle portal.

---

## 🎯 Test Scenarios

- [x] **Vehicle Data Consistency**
  - Validates that vehicle attributes (ID, Manufacturer, Price, Km, Fuel, Location) match between live backend API responses and rendered UI elements.
  - Priority checks: Manufacturer, Price, Mileage (Km), Fuel, Availability — then Year/Transmission/Color.
  - Test types: single-filter, filter-combinations, sorting+pagination, API vs UI contract checks.
- [x] **UI Performance Benchmarks**
  - Measures Navigation Timing and Core Web Vitals (DOMContentLoaded, Page Load Time, First Contentful Paint) directly within Playwright tests.
- [x] **API Load & Performance Testing**
  - Executes load tests and SLA threshold verifications for backend endpoints using **k6**.
- [ ] **Inquiry Form Submission**
  - Submits the vehicle inquiry form via UI and asserts outgoing network payload correctness and validation handling.
- [ ] **State Mocks & Edge Cases**
  - Mocks dynamic pricing and availability statuses via network route overrides to exercise edge cases and error handling.
---

## 🛠️ Prerequisites & Setup

* **Node.js:** v18+ recommended
* **Package Manager:** npm or pnpm

```bash
# Install dependencies
npm install

# Install Playwright browser binaries
npx playwright install --with-deps