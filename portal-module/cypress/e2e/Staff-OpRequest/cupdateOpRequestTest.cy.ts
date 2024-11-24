// @ts-nocheck

import { doctorToken } from '../../utils/tokens';

describe('Staff - Update Operation Request', () => {

  beforeEach(() => {
    // Set up token in the app
    cy.visit(`/auth/callback?token=${doctorToken}`);

      // Intercept the API call to mock the server response
    cy.intercept('PUT', '/api/opRequest/update', {
        statusCode: 200,
        body: { message: 'op Request updated successfully' },
      }).as('updateOpRequest');
    });

  
    it('should update a operation request', () => {
        let alertMessage = '';
        cy.on('window:alert', (alertText) => {
          alertMessage = alertText; // Capture the alert message
        });
      cy.visit('/operationRequest');
  
      // Click on the select checkbox for the staffId "N202413599"
      cy.contains('td', 'testeint@gmail.com') // Find the cell with the staffId
        .parent() // Get the parent row
        .find('input[type="checkbox"]') // Find the checkbox in that row
        .check(); // Select the checkbox
  
      // Navigate to the Update Staff page
      cy.contains('button', 'Update Request').click();
  
      cy.get("#deadLine").type('2027-01-01T00:00:00');
      cy.get('#operationTypeName').type('Knee Replacement Surgery');
  
      // Submit the form
      cy.get('button').contains('Update Operation Request').click();
  
      // Assert success alert
      cy.wrap(null).should(() => {
        expect(alertMessage).to.equal('Operation Request updated successfully!');
      });
  
      // Verify the updated specialization in the staff list
      cy.visit('/operationRequest');
      cy.contains('td', 'testeint@gmail.com') // Find the row with the updated staffId
        .parent() // Get the parent row
        .within(() => {
          cy.contains('2027-01-01T00:00:00').should('exist'); // Verify the specialization
        });
    });
  });
  