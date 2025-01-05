// @ts-nocheck

import { adminToken } from '../../utils/tokens';

describe('Admin - Update Medical Record', () => {

  beforeEach(() => {
    // Set up token in the app
    cy.visit(`/auth/callback?token=${adminToken}`);
  });

  it('should update a medical record', () => {
    let alertMessage = '';
    cy.on('window:alert', (alertText) => {
      alertMessage = alertText; // Capture the alert message
    });

    cy.visit('staff/patientMedicalRecord');

    // Click on the select checkbox for the email "t@gmail.com"
    cy.contains('td', 't@gmail.com') // Find the cell with the email
      .parent() // Get the parent row
      .find('input[type="checkbox"]') // Find the checkbox in that row
      .check(); // Select the checkbox

    // Navigate to the Update Staff page
    cy.contains('button', 'Update Patient Medical Record').click();
    cy.get('select').eq(0)
      .select('Peanuts');

    cy.get('select').eq(1) 
      .select('Asthma');

    // Submit the form
    cy.get('button').contains('Update Patient Medical Record').click();

    // Assert success alert
    cy.wrap(null).should(() => {
      expect(alertMessage).to.equal('Patient Medical Record updated successfully.');
    });
  });
});
