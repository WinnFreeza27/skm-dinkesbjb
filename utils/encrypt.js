import crypto from 'crypto';

// Get the Base64 encoded public key from the environment variable
const publicKeyBase64 = process.env.NEXT_PUBLIC_PUBLICKEY;

// Decode the Base64 string into its original binary form
const publicKeyBuffer = Buffer.from(publicKeyBase64, 'base64');

// Convert the binary data back into a string
const publicKey = publicKeyBuffer.toString('utf-8');

// Add the PEM headers and split into lines of 64 characters
const formattedPublicKey = `${publicKey.match(/.{1,64}/g).join('\n')}`;

export const encryptData = (data) => {
    console.log(formattedPublicKey); // This should output the correctly formatted public key
    try {
        const buffer = Buffer.from(JSON.stringify(data), 'utf8');
        const encryptedData = crypto.publicEncrypt(formattedPublicKey, buffer);
        return encryptedData.toString('base64');
    } catch (error) {
        console.error("Encryption error:", error);
        throw error;
    }
};
