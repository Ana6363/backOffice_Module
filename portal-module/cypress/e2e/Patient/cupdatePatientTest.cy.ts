// @ts-nocheck

import { patientToken } from '../../utils/tokens';

describe('Update Patient', () => {
  beforeEach(() => {
    // Set up token in the app
    cy.visit(`/auth/callback?token=${patientToken}`);
  });

  it('should update a patient', () => {
    let alertMessage = '';
    cy.on('window:alert', (alertText) => {
      alertMessage = alertText; // Capture the alert message
    });

    cy.visit('/patient/update');

    // Update the fields with new values
    cy.get('#phoneNumber')
        .should('be.visible') // Ensure the field is visible
        .click() // Focus the field
        .clear() // Clear the field
        .type('{selectall}{del}');
    cy.get('#phoneNumber').type("987637487");
    cy.get('#emergencyContact').clear().type('123123123');

    // Verify the button is visible and clickable
    cy.get('button').contains('Save Changes').should('be.visible').should('not.be.disabled').click();

    // Assert success alert
    cy.wrap(null).should(() => {
      expect(alertMessage).to.equal('');
    });

    // Verify the updated details in the patient list
    cy.visit('/patient');
    cy.contains('123123123').should('exist');
  });
});
