import { defineConfig } from 'cypress';

const config = defineConfig({
  projectId: 'software-testing-cy',
  chromeWebSecurity: false,
  defaultCommandTimeout: 10000,
  env: {
    username: 'User',
    password: 'Test123!',
    email: 'user@test.com',
  },
  e2e: {
    baseUrl: 'https://www.automationexercise.com/',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});

export default config;
