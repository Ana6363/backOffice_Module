import { adminToken } from '../../utils/tokens';

describe('Admin - Create Staff Member', () => {

  beforeEach(() => {
    // Set up token in the app
    cy.visit(`/auth/callback?token=${adminToken}`);

      // Intercept the API call to mock the server response
    cy.intercept('PUT', '/api/staff/update', {
        statusCode: 200,
        body: { message: 'Staff updated successfully' },
      }).as('updateStaff');
    });

  
    it('should update a staff member specialization to Urology and remove one slot', () => {
        let alertMessage = '';
        cy.on('window:alert', (alertText) => {
          alertMessage = alertText; // Capture the alert message
        });
      cy.visit('/admin/staff');
  
      // Click on the select checkbox for the staffId "N202413599"
      cy.contains('td', 'N202413599') // Find the cell with the staffId
        .parent() // Get the parent row
        .find('input[type="checkbox"]') // Find the checkbox in that row
        .check(); // Select the checkbox
  
      // Navigate to the Update Staff page
      cy.contains('button', 'Update Staff').click();
  
      // Wait for the update staff form to load
      cy.url().should('include', '/admin/staff/update'); // Ensure the URL includes 'update'
  
      // Clear the specialization field in multiple steps
      cy.get('#specialization')
        .should('be.visible') // Ensure the field is visible
        .click() // Focus the field
        .clear() // Clear the field
        .type('{selectall}{del}') // Extra step to clear it entirely
        .should('have.value', ''); // Verify the field is empty
  
      // Type the new value "Urology"
      cy.get('#specialization').type('Urology').should('have.value', 'Urology');
  
      // Remove one slot
      cy.get('button').contains('Remove Slot').click();
  
      // Submit the form
      cy.get('button').contains('Update Staff').click();
  
      // Assert success alert
      cy.wrap(null).should(() => {
        expect(alertMessage).to.equal('Staff data updated successfully');
      });
  
      // Verify the updated specialization in the staff list
      cy.visit('/admin/staff');
      cy.contains('td', 'N202413599') // Find the row with the updated staffId
        .parent() // Get the parent row
        .within(() => {
          cy.contains('Urology').should('exist'); // Verify the specialization
        });
    });
  });
  