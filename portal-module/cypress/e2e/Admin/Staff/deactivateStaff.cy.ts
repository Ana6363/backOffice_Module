import { describe, it } from "node:test";

describe('Admin - Deactivate Staff Member', () => {
    it('should deactivate a staff member', () => {
        cy.visit('/admin/staff'); // Navigate to the staff management page

        // Select a staff member
        cy.contains('John').click();

        // Deactivate the staff member
        cy.get('button').contains('Deactivate Staff').click();

        // Assert success message
        cy.contains('Staff member deactivated successfully.');

        // Verify the staff member is no longer active
        cy.visit('/admin/staff');
        cy.contains('John').should('not.exist');
    });
});
