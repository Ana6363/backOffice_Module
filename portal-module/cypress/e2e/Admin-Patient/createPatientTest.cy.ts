// @ts-nocheck

import { adminToken } from '../../utils/tokens';

describe('Admin - Create Patient', () => {

  beforeEach(() => {
    // Set up token in the app
    cy.visit(`/auth/callback?token=${adminToken}`);

    // Intercept the API call to mock the server response
    cy.intercept('POST', '/api/patient/create', {
      statusCode: 200,
      body: { message: 'Patient created successfully' },
    }).as('createPatient');
  });

  it('should create a new patient member', () => {
    let alertMessage = '';
    cy.on('window:alert', (alertText) => {
      alertMessage = alertText; // Capture the alert message
    });
    cy.visit('/admin/patient/create');

    // Fill the form fields
    cy.get("#userId").type('frontendtest@gmail.com');
    cy.get('#firstName').type('string');
    cy.get('#lastName').type('string');
    cy.get('#fullName').type('string');
    cy.get('#dateOfBirth').type('2004-12-23');
    cy.get('#phoneNumber').type('139359458');
    cy.get('#emergencyContact').type('139359261');
    cy.get('#gender').select('Male');

    // Submit the form
    cy.get('button').contains('Create Patient').click();

    // Assert the alert message
    cy.wrap(null).should(() => {
      expect(alertMessage).to.equal('Patient created successfully');
    });

    // Verify the staff member appears in the staff list
    cy.visit('/admin/patient');
    cy.contains('frontendtest@gmail.com').should('exist');
  });
});