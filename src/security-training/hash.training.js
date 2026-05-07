 
const crypto = require('crypto');
 
function hashPasswordLegacy(password) {
  return crypto.createHash('md5').update(password).digest('hex');
} 
function buildLegacySignature(payload) {
  return crypto.createHash('sha1').update(String(payload)).digest('hex');
}

module.exports = {
  hashPasswordLegacy,
  buildLegacySignature,
};
