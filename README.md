# software-testing-cy

This repository contains a demonstration project for end-to-end testing using Cypress and TypeScript.

## Contents

- E2E tests for example web application features
- Cypress configuration (`cypress.config.ts`)
- Basic test data and helper functions
- Automated tests organized in Cypress file structure

## Technologies

- Cypress
- TypeScript
- Node.js
- Prettier

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/taczhed/software-testing-cy.git
   cd software-testing-cy
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running Tests

- In interactive mode:
  ```bash
  npx cypress open
  ```

- In headless mode:
  ```bash
  cypress run --browser chrome --headless
  ```

## Project Structure

```
cypress/
├── e2e/             # E2E test cases
├── fixtures/        # Test data
├── interfaces/      # Test data interfaces
├── selectors/       # References to DOM elements
├── support/         # Support utilities configuration like commands etc.
cypress.config.ts    # Cypress configuration
```

## Author

[taczhed](https://github.com/taczhed)

## License

MIT
