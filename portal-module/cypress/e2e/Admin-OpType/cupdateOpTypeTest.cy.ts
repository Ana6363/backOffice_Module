// @ts-nocheck

import { adminToken } from '../../utils/tokens';

describe('Admin- Update Operation Type', () => {

  beforeEach(() => {
    // Set up token in the app
    cy.visit(`/auth/callback?token=${adminToken}`);

      // Intercept the API call to mock the server response
    cy.intercept('PUT', '/api/opType/update', {
        statusCode: 200,
        body: { message: 'op Tpe updated successfully' },
      }).as('updateOpType');
    });

  
    it('should update a operation type', () => {
        let alertMessage = '';
        cy.on('window:alert', (alertText) => {
          alertMessage = alertText; // Capture the alert message
        });
      cy.visit('admin/opTypes');
  
      // Click on the select checkbox for the staffId "N202413599"
      cy.contains('td', 'Test Operation') // Find the cell with the staffId
        .parent() // Get the parent row
        .find('input[type="checkbox"]') // Find the checkbox in that row
        .check(); // Select the checkbox
  
      // Navigate to the Update Staff page
      cy.contains('button', 'Update Operation Type').click();
  
      cy.get("#preparationTime").clear();
      cy.get("#preparationTime").type("30");
  
  
      // Submit the form
      cy.get('button').contains('Save Changes').click();
  
      // Assert success alert
      cy.wrap(null).should(() => {
        expect(alertMessage).to.equal('Operation Type updated successfully.');
      });
  
      // Verify the updated specialization in the staff list
      cy.visit('admin/opTypes');
      cy.contains('td', 'Test Operation') // Find the row with the updated staffId
        .parent() // Get the parent row
        .within(() => {
          cy.contains('30').should('exist'); // Verify the specialization
        });
    });
  });
  