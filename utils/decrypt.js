// decryptData.js
import crypto from 'crypto';

// Assuming RSA private key is stored in an environment variable
const privateKey = Buffer.from(process.env.NEXT_PUBLIC_PRIVATEKEY, 'base64').toString('utf-8');

export const decryptData = (encryptedData) => {
    const buffer = Buffer.from(encryptedData, 'base64');
    const decryptedData = crypto.privateDecrypt(privateKey, buffer);
    return JSON.parse(decryptedData.toString('utf8'));
}