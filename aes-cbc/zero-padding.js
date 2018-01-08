const crypto = require('crypto');

const encrypt = (plain, key, iv = '00000000000000000000000000000000') => {
    const cipher = crypto.createCipheriv('aes-256-cbc', toHexBuffer(key), toHexBuffer(iv)).setAutoPadding(false);
    return cipher.update(Buffer.from(plain, 'utf8'), 'utf8', 'hex') + cipher.final('hex');
}

const decrypt = (encrypted, key, iv = '00000000000000000000000000000000') => {
    const decipher = crypto.createDecipheriv('aes-256-cbc', toHexBuffer(key), toHexBuffer(iv)).setAutoPadding(false);
    return decipher.update(Buffer.from(encrypted, 'hex'), 'utf8', 'utf8') + decipher.final('utf8');
}

const toHexBuffer = string => Buffer.from(string, 'hex')

const zeropad = (inputData, length = 8) => {
    inputData = Buffer.from(inputData, "utf8").toString("hex");
    console.log(`before padding \t${inputData}`)
    const bitLength = inputData.length * length;
    if (bitLength < 256) {
        for (let i = bitLength; i < 256; i += length) {
            inputData += 0;
        }
    } else if (bitLength > 256) {
        while ((inputData.length * length) % 256 != 0) {
            inputData += 0;
        }
    }
    console.log(`after padding \t${inputData}`)
    return Buffer.from(inputData, "hex").toString("utf8");
}

const key = "1111111111111111111111111111111111111111111111111111111111111111"
const iv = "22222222222222222222222222222222"

console.log(`aes key \t${key}`)
console.log(`init vector \t${iv}`)

let plain = "Hello world"
plain = zeropad(plain, 8)

const encrypted = encrypt(plain, key, iv)
console.log(`Encrypted \t${encrypted}`)

const decrypted = decrypt(encrypted, key, iv);
console.log(`Decrypted \t${decrypted}`)

