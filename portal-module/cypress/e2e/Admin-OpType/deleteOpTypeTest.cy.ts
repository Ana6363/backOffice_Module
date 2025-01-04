// @ts-nocheck

import { adminToken } from '../../utils/tokens';

describe('Staff - Delete Operation Request', () => {
  beforeEach(() => {
    // Set up token in the app
    cy.visit(`/auth/callback?token=${adminToken}`);
    // Intercept the API call to mock the server response for deactivating a staff member
    cy.intercept('PUT', '/api/opType/delete', {
      statusCode: 200,
      body: { message: 'Operation Type deleted successfully' },
    }).as('deleteOpType');
  });

  it('delete the operation type', () => {
    cy.visit('admin/opTypes'); // Navigate to the staff management page
    let alertMessage = '';
    cy.on('window:alert', (alertText) => {
      alertMessage = alertText; // Capture the alert message
    });

    // Select the staff member with ID "N202413599"
    cy.contains('td', 'Test Operation') // Find the cell with the staffId
      .parent() // Get the parent row
      .find('input[type="checkbox"]') // Find the checkbox in that row
      .check(); // Select the checkbox

    // Click the "Deactivate Staff" button
    cy.contains('button', 'Delete Operation Type').click();
    cy.contains('button', 'Delete').click();

    // Wrap the captured alert message to assert its content
    cy.wrap(null).should(() => {
      expect(alertMessage).to.equal('Operation type Test Operation deleted successfully.'); })
    });

});
