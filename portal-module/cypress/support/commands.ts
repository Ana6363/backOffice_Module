import { generateMockToken } from './generateMockToken';

Cypress.Commands.add('mockLogin', (role, email) => {
    const token = generateMockToken(email, role);
    localStorage.setItem('token', token);
});
