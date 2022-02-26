const getProfile = require('../pages/profile')
const changeQiwi = require('../pages/changeQiwi')
const getTops = require('../pages/top')
module.exports = userManager = async (msg) => {

    commands = {

        back: () => msg.send('Главное меню', {
            keyboard: mainBoard(msg.user.admin)
        }),
        profile: () => getProfile(msg),
        changeQiwi: () => changeQiwi(msg),
        topInvested: () => getTops(msg, 'invested'),
        topRef: () => getTops(msg, 'ref.value'),

    }

    try {
        commands[msg.messagePayload.command]()
    } catch (e) { console.log('--> Не нажали на кнопку User Manager\'a') }

}