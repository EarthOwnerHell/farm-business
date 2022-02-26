const { Keyboard } = require('vk-io')
const { groupId } = require('../settings/config.json')

const green = Keyboard.POSITIVE_COLOR
const blue = Keyboard.PRIMARY_COLOR
const red = Keyboard.NEGATIVE_COLOR
const grey = Keyboard.SECONDARY_COLOR

const textButton = (label, command = label, color = Keyboard.SECONDARY_COLOR) => (
    Keyboard.textButton({
        label,
        payload: { command },
        color,
    })
)

const adminButton = (label, admin = label, color = Keyboard.SECONDARY_COLOR) => (
    Keyboard.textButton({
        label,
        payload: { admin },
        color,
    })
)

const urlButton = (label, url) => (
    Keyboard.urlButton({
        label,
        url,
    })
)

/*const topBoard = Keyboard.keyboard([
    [
        textButton('📊 Топ по вложениям', 'topInvested', blue)
    ],
    [
        textButton('🙋‍♂ Топ по рефералам', 'topRef', blue)
    ],
]).inline()*/

module.exports = {
};
