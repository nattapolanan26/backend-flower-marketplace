import crypto from "crypto";
const encryptionType = "aes-256-cbc";
const encryptionEncoding = "base64";
const bufferEncryption = "utf-8";
const secret_key = "Flower";
const secret_iv = "Marketplace";

// Generate secret hash with crypto to use for encryption
const AesKey = crypto
  .createHash("sha256")
  .update(secret_key)
  .digest("hex")
  .substring(0, 32);
const AesIV = crypto
  .createHash("sha256")
  .update(secret_iv)
  .digest("hex")
  .substring(0, 16);

// Encrypt data
export function encrypt(data: string) {
  const cipher = crypto.createCipheriv(encryptionType, AesKey, AesIV);
  return Buffer.from(
    cipher.update(data, bufferEncryption, "hex") + cipher.final("hex")
  ).toString(encryptionEncoding); // Encrypts data and converts to hex and base64
}

// Decrypt data
export function decrypt(encryptedData: string) {
  const buff = Buffer.from(encryptedData, encryptionEncoding);
  const decipher = crypto.createDecipheriv(encryptionType, AesKey, AesIV);
  return (
    decipher.update(buff.toString(bufferEncryption), "hex", bufferEncryption) +
    decipher.final(bufferEncryption)
  ); // Decrypts data and converts to utf8
}

export default { encrypt, decrypt };
