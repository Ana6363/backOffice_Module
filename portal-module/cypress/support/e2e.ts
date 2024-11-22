// cypress/support/e2e.ts

// Import any custom commands (create this file if you have custom commands)
import './commands';

// Catch and ignore uncaught exceptions to prevent tests from failing unnecessarily
Cypress.on('uncaught:exception', (err) => {
  console.error('Uncaught exception:', err);
  return false; // Prevent Cypress from failing the test
});

// Hook to run code before each test
beforeEach(() => {
  // Clear cookies, localStorage, and sessionStorage before each test
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.log('Running setup before each test...');
});

// Hook to run code after each test
afterEach(() => {
  cy.log('Cleaning up after each test...');
});

// Optional: Define global variables or configuration settings
Cypress.env('apiBaseUrl', 'http://localhost:5184/api/v1'); // Example for setting an environment variable
