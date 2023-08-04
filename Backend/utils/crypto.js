const crypto = require('crypto');


function encryptSecretKey(secretKey, encryptionKey) {
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey,iv);
    let encryptedSecretKey = cipher.update(secretKey, 'utf8', 'hex');
    encryptedSecretKey += cipher.final('hex');
    return iv.toString('hex')+ encryptedSecretKey;
  }
  
  // Function to decrypt the encrypted secret key using AES
  function decryptSecretKey(encryptedSecretKey, encryptionKey) {

    try {
        const iv = Buffer.from(encryptedSecretKey.slice(0, 32), 'hex');
        const encryptedContent = encryptedSecretKey.slice(32);
      const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey,iv);
      let decryptedSecretKey = decipher.update(encryptedContent, 'hex', 'utf8');
   
      decryptedSecretKey += decipher.final('utf8');
      return decryptedSecretKey;
    } catch (error) {
      console.error('Decryption error:', error.message);
      throw error;
    }
  }


  module.exports = {encryptSecretKey,decryptSecretKey}