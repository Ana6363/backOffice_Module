// @ts-nocheck

import { adminToken } from '../../utils/tokens';

describe('Admin - Create Allergy', () => {

  beforeEach(() => {
    // Set up token in the app
    cy.visit(`/auth/callback?token=${adminToken}`);

    // Intercept the API call to mock the server response
    cy.intercept('POST', '/api/allergies', {
      statusCode: 200,
      body: { message: 'Allergy created successfully' },
    }).as('createAllergy');
  });

  it('should create a Allergy', () => {
    let alertMessage = '';
    cy.on('window:alert', (alertText) => {
      alertMessage = alertText; // Capture the alert message
    });
    cy.visit('admin/createAllergy');

    // Fill the form fields
    cy.get("#name").type('Test Allergy');
    cy.get('#description').type('Test');

    // Submit the form
    cy.get('button').contains('Create Allergy').click();

    // Assert the alert message
    cy.wrap(null).should(() => {
      expect(alertMessage).to.equal('Allergy created successfully');
    });
  });
});