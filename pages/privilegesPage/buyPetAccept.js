const { Keyboard } = require('vk-io')
const { vkMsgKeyboard } = require('../../settings/vk')
const { buyPet } = require('../../keyboards/inline')

module.exports = async(msg) => {
const { id } = msg.user
const acceptPet = Keyboard.keyboard([
        [
            (buyPet('☑️', msg.eventPayload.pet, Keyboard.PRIMARY_COLOR,))
        ],
    ]).inline()

return vkMsgKeyboard(id, "🤩 Подтверждаете покупку? (После нажатия кнопки будет выслан счёт для оплаты)", acceptPet)
}
