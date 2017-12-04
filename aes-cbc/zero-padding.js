const crypto = require('crypto');

const encrypt = (plain, key, iv = '00000000000000000000000000000000') => {
    let cipher = crypto.createCipheriv('aes-256-cbc', toHexBuffer(key), toHexBuffer(iv));
    cipher.setAutoPadding(false);
    return cipher.update(Buffer.from(plain, 'utf8'), 'utf8', 'hex') + cipher.final('hex');
}

