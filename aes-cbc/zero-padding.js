const crypto = require('crypto');

const encrypt = (plain, key, iv = '00000000000000000000000000000000') => {
    const cipher = crypto.createCipheriv('aes-256-cbc', toHexBuffer(key), toHexBuffer(iv));
    cipher.setAutoPadding(false);
    return cipher.update(Buffer.from(plain, 'utf8'), 'utf8', 'hex') + cipher.final('hex');
}

const decrypt = (encrypted, key, iv = '00000000000000000000000000000000') => {
    const decipher = crypto.createDecipheriv('aes-256-cbc', toHexBuffer(key), toHexBuffer(iv));
    decipher.setAutoPadding(false);
    return decipher.update(Buffer.from(encrypted, 'hex'), 'utf8', 'utf8') + decipher.final('utf8');
}

const toHexBuffer = string => Buffer.from(string, 'hex')

const zeropad = (input, length = 16) => {
    let inputInHexString = new Buffer(input, "utf8").toString("hex");
    console.log(`before padding \t${inputInHexString}`)
    var bitLength = inputInHexString.length * length;

    if (bitLength < 256) {
        for (i = bitLength; i < 256; i += length) {
            inputInHexString += 0;
        }
    } else if (bitLength > 256) {
        while ((inputInHexString.length * length) % 256 != 0) {
            inputInHexString += 0;
        }
    }
    console.log(`after padding \t${inputInHexString}`)
    return new Buffer(inputInHexString, "hex").toString("utf8");
}

const key = "603deb1015ca71be2b73aef0857d77811f352c073b6108d72d9810a30914dff4"
const iv = "b24bf2f77ac5ec0c5e1f4dc1ae465e75"

console.log(`aes key \t${key}`)
console.log(`init vector \t${iv}`)

let before = "Hello World"
let after = zeropad(before, 16)

