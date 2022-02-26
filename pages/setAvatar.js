const { vk, vkMsgKeyboard } = require('../settings/vk')
const { setAvatarUser } = require('../database/manager/user')
const { backToProfile } = require('../keyboards/inline')


module.exports = setAvatar = (msg, number) => {

    const { eventId, userId, peerId } = msg

    const names = {
        1: 'Чак',
        2: 'Бомб',
        3: 'Ред',
        4: 'Стелла'
    }

    vk.api.messages.sendMessageEventAnswer({
        event_id: eventId,
        user_id: userId,
        peer_id: peerId,
        event_data: JSON.stringify({
            'type': 'show_snackbar',
            'text': `🔥 Сменили персонажа!`
        })
    })

    setAvatarUser(userId, number)
    vkMsgKeyboard(userId, '🤔 Вернуться в профиль?', backToProfile)
}