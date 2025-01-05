// @ts-nocheck

import { adminToken } from '../../utils/tokens';

describe('Admin - Create Medical Condition', () => {

  beforeEach(() => {
    // Set up token in the app
    cy.visit(`/auth/callback?token=${adminToken}`);
  });

  it('should create a Medical Condition', () => {
    let alertMessage = '';
    cy.on('window:alert', (alertText) => {
      alertMessage = alertText; // Capture the alert message
    });
    cy.visit('admin/createMedicalCondition');

    // Fill the form fields
    cy.get("#name").type('Test Medical Condition');
    cy.get('#description').type('Test Description');

    // Submit the form
    cy.get('button').contains('Create Medical Condition').click();

    // Assert the alert message
    cy.wrap(null).should(() => {
      expect(alertMessage).to.equal('Medical Condition created successfully');
    });
  });
});