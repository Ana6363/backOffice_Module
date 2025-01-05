// @ts-nocheck

import { adminToken } from '../../utils/tokens';

describe('Admin- Update Allergy', () => {

  beforeEach(() => {
    // Set up token in the app
    cy.visit(`/auth/callback?token=${adminToken}`);
    });

  
    it('should update an allergy', () => {
        let alertMessage = '';
        cy.on('window:alert', (alertText) => {
          alertMessage = alertText; // Capture the alert message
        });
      cy.visit('admin/allergies');
  
      // Click on the select checkbox for the staffId "N202413599"
      cy.contains('td', 'Test Allergy') // Find the cell with the staffId
        .parent() // Get the parent row
        .find('input[type="checkbox"]') // Find the checkbox in that row
        .check(); // Select the checkbox
  
      // Navigate to the Update Staff page
      cy.contains('button', 'Update Allergy').click();
  
      cy.get("#description").clear();
      cy.get("#description").type("test description");
  
  
      // Submit the form
      cy.get('button').contains('Update Allergy').click();
  
      // Assert success alert
      cy.wrap(null).should(() => {
        expect(alertMessage).to.equal('Allergy updated successfully.');
      });
  
      // Verify the updated specialization in the staff list
      cy.visit('admin/allergies');
      cy.contains('td', 'Test Allergy') // Find the row with the updated staffId
        .parent() // Get the parent row
        .within(() => {
          cy.contains('Test Description').should('exist'); // Verify the specialization
        });
    });
  });
  