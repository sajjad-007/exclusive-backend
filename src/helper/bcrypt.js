const bcrypt = require('bcrypt');

const passEncryption = async(plainPassword) => {
    return await bcrypt.hash(plainPassword, 10)
}
const checkPassword = async (plainPassword, hassPass) => {
    return await bcrypt.compare(plainPassword, hassPass);
} 

module.exports = { passEncryption, checkPassword }