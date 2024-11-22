// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from 'cypress/react18';
import { generateMockToken } from './generateMockToken';

// Extend the Cypress namespace to include type definitions for your custom commands
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Mount a React component for testing.
       * @param component - The component to mount.
       * @param options - Additional options for mounting the component.
       */
      mount: typeof mount;

      /**
       * Mock login by setting a JWT token in localStorage.
       * @param role - The role to mock (e.g., 'Admin', 'Patient').
       * @param email - The email to mock.
       */
      mockLogin(role: string, email: string): Chainable<void>;
    }
  }
}

// Add the `mount` command for mounting React components
Cypress.Commands.add('mount', mount);

// Add the `mockLogin` command for mocking login
Cypress.Commands.add('mockLogin', (role: string, email: string) => {
  const token = generateMockToken(email, role); // Make sure to import your `generateMockToken` function
  localStorage.setItem('token', token);
});

// Example usage in a test:
// cy.mount(<MyComponent />);
