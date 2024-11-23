import { doctorToken } from '../../utils/tokens';

describe('Doctor - Update Op Request', () => {

  beforeEach(() => {
    // Set up token in the app
    cy.visit(`/auth/callback?token=${doctorToken}`);

  it('should update a op request', () => {
    let alertMessage = '';
    cy.on('window:alert', (alertText) => {
      alertMessage = alertText; // Capture the alert message
    });

    cy.visit('/opRequest');

    // Click on the select checkbox for the patient with email "frontendtest@gmail.com"
    cy.contains('td', 'f@gmail.com') // Find the cell with the email
      .parent() // Get the parent row
      .find('input[type="checkbox"]') // Find the checkbox in that row
      .check(); // Select the checkbox

    // Navigate to the Update Patient page
    cy.contains('button', 'Update Request').click();

    // Wait for the update patient form to load
    cy.url().should('include', '/admin/patient/update'); // Ensure the URL includes 'update'

    // Update the fields with new values
    cy.get('#firstName').type('Marc'); // Clear and type new first name
    cy.get('#lastName').type('Johns'); // Clear and type new last name
    cy.get('#dateOfBirth').type('2005-12-23'); // Clear and type new date of birth
    cy.get('#emergencyContact').clear().type('123876908'); // Clear and type new emergency contact
    cy.get('#fullName').type('Marc Johns Jr'); // Clear and type new full name

    // Submit the form
    cy.get('button').contains('Update Patient').click();

    // Assert success alert
    cy.wrap(null).should(() => {
      expect(alertMessage).to.equal('Patient data updated successfully');
    });

    // Verify the updated details in the patient list
    cy.visit('/admin/patient');
    cy.contains('td', 'frontendtest@gmail.com') // Find the row with the updated patient email
      .parent() // Get the parent row
      .within(() => {
        cy.contains('2005-12-23').should('exist');
        cy.contains('123876908').should('exist');
      });
  });
});
