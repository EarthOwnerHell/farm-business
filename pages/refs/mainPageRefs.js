const { lvlOfRefBoard } = require('../../keyboards/inline')
const { vk, vkMsgKeyboard } = require('../../settings/vk')
const { deckOfNum, numberWithSpace } = require('../../tools')
const { getGlobal } = require("../../database/manager/global")

module.exports = mainPageRefs = async (msg) =>  {
    const { forRef } = await getGlobal()
    const { id, ref: { value } } = msg.user

    vk.api.call("utils.getShortLink", { url: `vk.me/bizfarm?ref=${id}` }).then(function (res) {
        vkMsgKeyboard(id,`🎁 Реферальная программа\n\n🎯 Приглашайте друзей, мы платим за каждого реферала:\n\n🤑 ${numberWithSpace(forRef)} 🌾 (${(forRef / 16000).toFixed(2)} ₽) на баланс\n🔥 Процент от пополнений реферала, сразу на вывод!\n\n⚡Ваш процент: ${value < 10 ? '3% ( 1 уровень )' 
        : value < 20 ? '4% ( 2 уровень )' 
        : value < 30 ? '5% (3 уровень)' 
        : value < 40 ? '6% (4 уровень)' 
        : '7% (5 уровень)' }\n\n🔗 Ссылка для приглашения:\n\n[ ${res.short_url} ]`, lvlOfRefBoard)
    })

    const res = deckOfNum(value, ['реферал','реферала','рефералов'])

    vk.api.messages.sendMessageEventAnswer({
        event_id: msg.eventId,
        user_id: msg.userId,
        peer_id: msg.peerId,
        event_data: JSON.stringify({
            'type': 'show_snackbar',
            'text': `👀 У вас ${new Intl.NumberFormat('ru-RU').format(value)} ${res}`
        })
    })

}
