const zlib = require('zlib');
const fs = require('fs');
const forge = require("node-forge");

const certBinBuffer = fs.readFileSync('mycert.bin')
const x = Buffer.from(certBinBuffer).toString('hex')


const buffer = Buffer.from(x, 'hex');
zlib.unzip(buffer, (err, buffer) => {
    if (!err) {
        const base64OfDer = Buffer.from(buffer).toString('base64')
        const pemForm = derToPem(base64OfDer)
        console.log('\n', pemForm)
    } else {
        // handle error
    }
});

const derToPem = der => {
    
    var derKey = forge.util.decode64(der);
    var asnObj = forge.asn1.fromDer(derKey);
    var asn1Cert = forge.pki.certificateFromAsn1(asnObj);
    return forge.pki.certificateToPem(asn1Cert);
};