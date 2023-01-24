const bcrypt = require("bcryptjs");

const EncryptPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
};
export async function verifyPassword(password, hashedPassword) {
  if (!hashedPassword) return false;
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
}
export default EncryptPassword;
