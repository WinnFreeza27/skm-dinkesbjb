// Assuming you have the public key as a string
const publicKeyBase64 = process.env.NEXT_PUBLIC_RSA_PUBLIC_KEY;
const publicKeyPem = Buffer.from(publicKeyBase64, 'base64').toString('utf-8');
// Function to convert PEM key to CryptoKey
async function importPublicKey(pem) {
  // Remove PEM header/footer and decode Base64
  const base64Key = pem
    .replace(/-----(BEGIN|END) PUBLIC KEY-----/g, '')
    .replace(/\s+/g, '');
  const binaryDer = Buffer.from(base64Key, 'base64');

  // Import the binary DER key into a CryptoKey
  return window.crypto.subtle.importKey(
    'spki', // Key format
    binaryDer, // Key data
    {
      name: 'RSA-OAEP', // Algorithm
      hash: { name: 'SHA-256' } // Hashing algorithm
    },
    false, // Not extractable
    ['encrypt'] // Key usages
  );
}

// Function to encrypt data using the public key
export async function encryptData(data) {
  const publicKey = await importPublicKey(publicKeyPem);

  const encryptedBuffer = await window.crypto.subtle.encrypt(
    {
      name: 'RSA-OAEP', // RSA with Optimal Asymmetric Encryption Padding
    },
    publicKey,
    new TextEncoder().encode(data) // Convert the data to a Uint8Array
  );

  return Buffer.from(encryptedBuffer).toString('base64'); // Convert ArrayBuffer to Base64 string
}