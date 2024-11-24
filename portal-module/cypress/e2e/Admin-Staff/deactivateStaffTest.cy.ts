// @ts-nocheck

import { adminToken } from '../../utils/tokens';

describe('Admin - Deactivate Staff Member', () => {
  beforeEach(() => {
    // Set up token in the app
    cy.visit(`/auth/callback?token=${adminToken}`);
    // Intercept the API call to mock the server response for deactivating a staff member
    cy.intercept('PUT', '/api/staff/deactivate', {
      statusCode: 200,
      body: { message: 'Staff member deactivated successfully' },
    }).as('deactivateStaff');
  });

  it('should deactivate the staff member N202413599', () => {
    cy.visit('/admin/staff'); // Navigate to the staff management page
    let alertMessage = '';
    cy.on('window:alert', (alertText) => {
      alertMessage = alertText; // Capture the alert message
    });

    // Select the staff member with ID "N202413599"
    cy.contains('td', 'N202413599') // Find the cell with the staffId
      .parent() // Get the parent row
      .find('input[type="checkbox"]') // Find the checkbox in that row
      .check(); // Select the checkbox

    // Click the "Deactivate Staff" button
    cy.contains('button', 'Deactivate Staff').click();

    // Wrap the captured alert message to assert its content
    cy.wrap(null).should(() => {
      expect(alertMessage).to.equal('Staff member deactivated successfully.');
    });

  });
});
