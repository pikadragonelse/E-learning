const CryptoJS = require("crypto-js");

const decryptId = (encryptedId) => {
    const bytes = CryptoJS.AES.decrypt(encryptedId.toString(), "helouahsnhdf");

    return bytes.toString(CryptoJS.enc.Utf8);
};

const encryptId = (id) => {
    return CryptoJS.AES.encrypt(id.toString(), "helouahsnhdf").toString();
};

const string = encryptId("message");
const message = decryptId(string);
console.log(message);
