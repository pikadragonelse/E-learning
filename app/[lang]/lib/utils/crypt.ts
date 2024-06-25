import CryptoJS from "crypto-js";

export const decryptId = (encryptedId: number) => {
    const bytes = CryptoJS.AES.decrypt(
        encryptedId.toString(),
        process.env.CRYPTO_SECRET_KEY || ""
    );
    return bytes.toString(CryptoJS.enc.Utf8);
};

export const encryptId = (id: number) => {
    return CryptoJS.AES.encrypt(
        id.toString(),
        process.env.CRYPTO_SECRET_KEY || ""
    ).toString();
};
