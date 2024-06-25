import CryptoJS from "crypto-js";

// Chuyển đổi Base64 thành URL-safe
function base64UrlEncode(base64: string) {
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(base64Url: string) {
    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
        base64 += "=";
    }
    return base64;
}

// Hàm mã hóa URL-safe
export function encryptUrlSafe(data: string, key: string) {
    const ciphertext = CryptoJS.AES.encrypt(data, key).toString();
    return base64UrlEncode(ciphertext);
}

// Hàm giải mã URL-safe
export function decryptUrlSafe(encryptedData: string, key: string) {
    const ciphertext = base64UrlDecode(encryptedData);
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    return bytes.toString(CryptoJS.enc.Utf8);
}
