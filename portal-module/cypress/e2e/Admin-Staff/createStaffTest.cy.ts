import { adminToken } from '../../utils/tokens';

describe('Admin - Create Staff Member', () => {

  beforeEach(() => {
    // Set up token in the app
    cy.visit(`/auth/callback?token=${adminToken}`);

    // Intercept the API call to mock the server response
    cy.intercept('POST', '/api/staff/create', {
      statusCode: 200,
      body: { message: 'Staff created successfully' },
    }).as('createStaff');
  });

  it('should create a new staff member', () => {
    let alertMessage = '';
    cy.on('window:alert', (alertText) => {
      alertMessage = alertText; // Capture the alert message
    });
    cy.visit('/admin/staff/create');

    // Fill the form fields
    cy.get("#staffId").type('N202413599@myhospital.com');
    cy.get('#licenseNumber').type('17456');
    cy.get('#specialization').type('Cardiology');
    cy.get('#phoneNumber').type('139359261');
    cy.get('#firstName').type('string');
    cy.get('#lastName').type('string');
    cy.get('#fullName').type('string');
    cy.get('#status').select('active');

    // Add available slots
    cy.get('input[type="datetime-local"]').first().type('2024-12-23T09:00');
    cy.get('input[type="datetime-local"]').last().type('2024-12-23T17:00');

    // Submit the form
    cy.get('button').contains('Create Staff').click();

    // Assert the alert message
    cy.wrap(null).should(() => {
      expect(alertMessage).to.equal('Staff member created successfully');
    });

    // Verify the staff member appears in the staff list
    cy.visit('/admin/staff');
    cy.contains('N202413599').should('exist');
  });
});