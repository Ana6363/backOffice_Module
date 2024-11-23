import { adminToken } from '../../utils/tokens';

describe('Admin - Mark Patient For Deletion Member', () => {
  beforeEach(() => {
    // Set up token in the app
    cy.visit(`/auth/callback?token=${adminToken}`);
    // Intercept the API call to mock the server response for deactivating a staff member
    cy.intercept('PUT', '/api/patient/markForDeletion', {
      statusCode: 200,
      body: { message: 'Patient marked for deletion successfully' },
    }).as('markToDeletePatient');
  });

  it('should mark for deletion the patient frontendtest@gmail.com', () => {
    cy.visit('/admin/patient'); // Navigate to the staff management page
    let alertMessage = '';
    cy.on('window:alert', (alertText) => {
      alertMessage = alertText; // Capture the alert message
    });

    // Select the staff member with ID "N202413599"
    cy.contains('td', 'frontendtest@gmail.com') // Find the cell with the staffId
      .parent() // Get the parent row
      .find('input[type="checkbox"]') // Find the checkbox in that row
      .check(); // Select the checkbox

    // Click the "Deactivate Staff" button
    cy.contains('button', 'Mark for Deletion').click();
    cy.contains('button', 'Confirm').click();

    // Wrap the captured alert message to assert its content
    cy.wrap(null).should(() => {
      expect(alertMessage).to.equal('Patient marked for deletion successfully');
    });

    cy.contains('td', 'frontendtest@gmail.com') // Find the row with the updated patient email
      .parent() // Get the parent row
      .within(() => {
        cy.contains('true').should('exist'); })
  });
});
