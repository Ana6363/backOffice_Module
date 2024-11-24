// @ts-nocheck

import { doctorToken } from '../../utils/tokens';

describe('Admin - Create Op Request Member', () => {

  beforeEach(() => {
    // Set up token in the app
    cy.visit(`/auth/callback?token=${doctorToken}`);

    // Intercept the API call to mock the server response
    cy.intercept('POST', '/api/opRequest/create', {
      statusCode: 200,
      body: { message: 'OP Request created successfully' },
    }).as('createStaff');
  });

  it('should create a Op Request', () => {
    let alertMessage = '';
    cy.on('window:alert', (alertText) => {
      alertMessage = alertText; // Capture the alert message
    });
    cy.visit('/operationRequest/create');

    // Fill the form fields
    cy.get("#deadline").type('2025-01-01T00:00:00');
    cy.get('#priority').select('MEDIUM');
    cy.get('#userId').type('t@gmail.com');
    cy.get('#operationTypeName').type('ACL Reconstruction Surgery');

    // Submit the form
    cy.get('button').contains('Create Request').click();

    // Assert the alert message
    cy.wrap(null).should(() => {
      expect(alertMessage).to.equal('Operation Request created successfully!');
    });
  });
});