## Autohaus Royal Hybrid Test Automation Framework (UI + API)

A hybrid test suite combining **Playwright (TypeScript)** UI automation with direct API validation for the Autohaus Royal vehicle portal.

---

## 🎯 Test Scenarios
- [x] **Vehicle Data Consistency**
  - Validates that vehicle attributes (ID, manufacturer, formatted price) match between live backend API responses and rendered UI elements.
- [ ] **Inquiry Form Submission**
  - Submits the vehicle inquiry form via UI and asserts outgoing network payload correctness.
- [ ] **State Mocks & Edge Cases**
  - Mocks dynamic pricing and availability statuses via network route overrides.
---

## 🛠️ Prerequisites & Setup

* **Node.js:** v18+ recommended
* **Package Manager:** npm or pnpm

```bash
# Install dependencies
npm install

# Install Playwright browser binaries
npx playwright install --with-deps