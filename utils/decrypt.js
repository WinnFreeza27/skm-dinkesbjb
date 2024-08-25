import { webcrypto } from 'crypto';
import { Buffer } from 'buffer';

const privateKeyBase64 = process.env.RSA_PRIVATE_KEY;
const privateKeyPem = Buffer.from(privateKeyBase64, 'base64').toString('utf-8');

// Function to convert PEM key to CryptoKey
async function importPrivateKey(pem) {
  // Remove PEM header/footer and decode Base64
  const base64Key = pem
    .replace(/-----(BEGIN|END) PRIVATE KEY-----/g, '')
    .replace(/\s+/g, '');
  const binaryDer = Buffer.from(base64Key, 'base64');

  // Import the binary DER key into a CryptoKey
  return webcrypto.subtle.importKey(
    'pkcs8', // Key format for private key
    binaryDer, // Key data
    {
      name: 'RSA-OAEP', // Algorithm
      hash: { name: 'SHA-256' } // Hashing algorithm
    },
    false, // Not extractable
    ['decrypt'] // Key usages
  );
}

// Function to decrypt data using the private key
export async function decryptData(encryptedData) {
  const privateKey = await importPrivateKey(privateKeyPem);
  const encryptedBuffer = Buffer.from(encryptedData, 'base64'); // Convert Base64 string to ArrayBuffer

  const decryptedBuffer = await webcrypto.subtle.decrypt(
    {
      name: 'RSA-OAEP', // RSA with Optimal Asymmetric Encryption Padding
    },
    privateKey, // Imported CryptoKey object
    encryptedBuffer // The encrypted data
  );

  return new TextDecoder().decode(decryptedBuffer); // Convert ArrayBuffer to string
}