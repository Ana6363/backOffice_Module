describe('Admin - Create Staff Member', () => {
    beforeEach(() => {
      cy.mockLogin('Admin', 'rafoide18@gmail.com'); // Mock login before each test
    });
  
    it('should create a new staff member', () => {
      cy.visit('/admin/staff/create'); // Navigate to the Create Staff page
  
      // Fill the form fields
      cy.get('#firstName').type('John');
      cy.get('#lastName').type('Doe');
      cy.get('#phoneNumber').type('123985678');
      cy.get('#specialization').type('Doctor');
      cy.get('#status').select('active');
  
      // Add available slots
      cy.get('button').contains('Add Slot').click();
      cy.get('input[type="datetime-local"]').first().type('2024-11-22T09:00');
      cy.get('input[type="datetime-local"]').last().type('2024-11-22T17:00');
  
      // Submit the form
      cy.get('button').contains('Create Staff').click();
  
      // Assert success message
      cy.contains('Staff member created successfully');
  
      // Verify the staff member appears in the staff list
      cy.visit('/admin/staff');
      cy.contains('John').should('exist');
      cy.contains('Doe').should('exist');
    });
  });
  