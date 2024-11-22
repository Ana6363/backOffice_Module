const crypto = require('crypto');

const secretKey = 'CzgsD0L0CTeutbJnpnxugTcNLh3z7IJ845HkdvbeKLf83'; // Use as plain string
const issuer = 'http://localhost:5184';
const audience = 'http://localhost:5184';

function base64UrlEncode(str) {
    return Buffer.from(str)
        .toString('base64') // Standard Base64 encoding
        .replace(/=/g, '') // Remove padding
        .replace(/\+/g, '-') // Replace '+' with '-'
        .replace(/\//g, '_'); // Replace '/' with '_'
}

function generateMockToken(email, role) {
    if (!email || !role) {
        throw new Error('Both email and role are required to generate a token');
    }

    // Header
    const header = {
        alg: 'HS256',
        typ: 'JWT',
    };

    // Payload
    const payload = {
        email,
        role,
        iss: issuer,
        aud: audience,
        exp: Math.floor(Date.now() / 1000) + 40 * 60, // Expiration time in seconds
    };

    // Encode header and payload
    const encodedHeader = base64UrlEncode(JSON.stringify(header));
    const encodedPayload = base64UrlEncode(JSON.stringify(payload));

    // Signature
    const signature = crypto
        .createHmac('sha256', secretKey)
        .update(`${encodedHeader}.${encodedPayload}`)
        .digest('base64')
        .replace(/=/g, '') // Remove padding
        .replace(/\+/g, '-') // Replace '+' with '-'
        .replace(/\//g, '_'); // Replace '/' with '_'

    // JWT Token
    return `${encodedHeader}.${encodedPayload}.${signature}`;
}

module.exports = { generateMockToken };
