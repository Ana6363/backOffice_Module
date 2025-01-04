// @ts-nocheck

import { adminToken } from '../../utils/tokens';

describe('Admin - Create Op Type', () => {

  beforeEach(() => {
    // Set up token in the app
    cy.visit(`/auth/callback?token=${adminToken}`);

    // Intercept the API call to mock the server response
    cy.intercept('POST', '/api/opType/create', {
      statusCode: 200,
      body: { message: 'OP Type created successfully' },
    }).as('createOpType');
  });

  it('should create a Op Type', () => {
    let alertMessage = '';
    cy.on('window:alert', (alertText) => {
      alertMessage = alertText; // Capture the alert message
    });
    cy.visit('admin/opTypes/create');

    // Fill the form fields
    cy.get("#operationTypeName").type('Test Operation');
    cy.get('#preparationTime').type('10');
    cy.get('#surgeryTime').type('60');
    cy.get('#cleaningTime').type('15');

    cy.get('.specialization-group select')
      .first()
      .select('Cardiology'); 

    // Submit the form
    cy.get('button').contains('Create Operation Type').click();

    // Assert the alert message
    cy.wrap(null).should(() => {
      expect(alertMessage).to.equal('Operation Type created successfully');
    });
    cy.visit('admin/opTypes');
    cy.contains('Test Operation').should('exist');
  });
});