// تعریف کلیدها و IV (مقادیر واقعی را جایگزین کنید!)
const REQUEST_KEY = "your-request-key-32-chars";
const RESPONSE_KEY = "your-response-key-32-chars";
const HH_IV = "your-iv-16-chars";

function genReqCipher() {
  return CryptoJS.algo.AES.createEncryptor(CryptoJS.enc.Utf8.parse(REQUEST_KEY), {
    iv: CryptoJS.enc.Utf8.parse(HH_IV),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
}

function genResCipher() {
  return CryptoJS.algo.AES.createDecryptor(CryptoJS.enc.Utf8.parse(RESPONSE_KEY), {
    iv: CryptoJS.enc.Utf8.parse(HH_IV),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
}

function decryptRequest(payload) {
  const decrypted = genReqCipher().finalize(CryptoJS.enc.Base64.parse(payload));
  return CryptoJS.enc.Utf8.stringify(decrypted);
}

function encryptRequest(payload) {
  const encrypted = genReqCipher().finalize(CryptoJS.enc.Utf8.parse(payload));
  return CryptoJS.enc.Base64.stringify(encrypted);
}

function decryptResponse(payload) {
  const decrypted = genResCipher().finalize(CryptoJS.enc.Base64.parse(payload));
  return CryptoJS.enc.Utf8.stringify(decrypted);
}

function encryptResponse(payload) {
  const encrypted = genResCipher().finalize(CryptoJS.enc.Utf8.parse(payload));
  return CryptoJS.enc.Base64.stringify(encrypted);
}

// اتصال به window اگر نیاز است
window.encryptRequest = encryptRequest;
window.decryptResponse = decryptResponse;
