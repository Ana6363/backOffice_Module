// @ts-nocheck

import { doctorToken } from '../../utils/tokens';

describe('Staff - Delete Operation Request', () => {
  beforeEach(() => {
    // Set up token in the app
    cy.visit(`/auth/callback?token=${doctorToken}`);
    // Intercept the API call to mock the server response for deactivating a staff member
    cy.intercept('PUT', '/api/opRequest/delete', {
      statusCode: 200,
      body: { message: 'Operation Request deleted successfully' },
    }).as('deleteOpRequest');
  });

  it('delete the operation request', () => {
    cy.visit('/operationRequest'); // Navigate to the staff management page
    let alertMessage = '';
    cy.on('window:alert', (alertText) => {
      alertMessage = alertText; // Capture the alert message
    });

    // Select the staff member with ID "N202413599"
    cy.contains('td', 'testeint@gmail.com') // Find the cell with the staffId
      .parent() // Get the parent row
      .find('input[type="checkbox"]') // Find the checkbox in that row
      .check(); // Select the checkbox

    // Click the "Deactivate Staff" button
    cy.contains('button', 'Delete Request').click();
    cy.contains('button', 'Confirm').click();

    // Wrap the captured alert message to assert its content
    cy.wrap(null).should(() => {
      expect(alertMessage).to.equal('Operation request deleted successfully!'); })
    });

});
