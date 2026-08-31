# Autohaus Royal Hybrid Test Automation Framework (UI + API)

A hybrid test suite combining **Playwright (TypeScript)** UI automation with direct API validation for the Autohaus Royal vehicle portal.

---

## 🎯 Test Scenarios

- [ ] **Auth Injection (API + UI)**
    - Authenticates via REST API and seeds browser state for instant test execution.
- [ ] **Vehicle Data Consistency (API vs. UI)**
    - Validates vehicle details (e.g., `Wagennummer: 425-685`) match between backend responses and the DOM.
- [ ] **Inquiry Form Submission (End-to-End)**
    - Submits the inquiry form via UI and asserts network payload correctness.
- [ ] **State Mocks & Edge Cases (Interception)**
    - Mocks dynamic pricing and vehicle availability statuses.
---

## 🛠️ Prerequisites & Setup

* **Node.js:** v18+ recommended
* **Package Manager:** npm or pnpm

```bash
# Install dependencies
npm install

# Install Playwright browser binaries
npx playwright install --with-deps