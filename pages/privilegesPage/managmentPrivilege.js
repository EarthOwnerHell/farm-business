const { privilegeKeyboard, privilegeKeyboardWithoutBonus } = require('../../keyboards/inline')
module.exports = async(msg) => {
    const { lastGet, privilege } = msg.user
    const timePassed = Date.now() - lastGet
    privilege != "businessGig" ? msg.send('🎗 Управление', { keyboard: timePassed < 86_400_000 ? privilegeKeyboardWithoutBonus : privilegeKeyboard }) : msg.send('🎗 Управление', { keyboard: privilegeKeyboardWithoutBonus})
}
