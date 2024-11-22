import { describe, it } from "node:test";

describe('Admin - Update Staff Member', () => {
    it('should update a staff member', () => {
        cy.visit('/admin/staff'); // Navigate to the staff management page

        // Select a staff member
        cy.contains('John').click();

        // Navigate to the Update Staff page
        cy.get('button').contains('Update Staff').click();

        // Modify the staff member's details
        cy.get('#specialization').clear().type('Surgeon');
        cy.get('#phoneNumber').should('have.value', '123456789'); // Ensure it's pre-filled

        // Update available slots
        cy.get('button').contains('Add Slot').click();
        cy.get('input[type="datetime-local"]').last().type('2024-11-23T09:00');

        // Submit the form
        cy.get('button').contains('Update Staff').click();

        // Assert success message
        cy.contains('Staff data updated successfully');

        // Verify the changes in the staff list
        cy.visit('/admin/staff');
        cy.contains('Surgeon').should('exist');
    });
});
