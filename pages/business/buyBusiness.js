const { plusBusinessUser, minusBalanceUser, addInvestedUser, setNewLastEarn } = require("../../database/manager/user")
const { depInlineBoard, topInvested } = require("../../keyboards/inline")
const { vk, vkMsgKeyboard } = require("../../settings/vk")
const { numberWithSpace } = require("../../tools")

module.exports = buyBusiness = async (msg) => {

    const { balance, privilege } = msg.user
    const { eventId, userId, peerId } = msg

    const priceBusinesses = {
        market: privilege != "investor" ? 55792 : 50212,
        hospital: privilege != "investor" ? 114983 : 103484,
        motel: privilege != "investor" ? 235829 : 212246,
        theatre: privilege != "investor" ? 419276 : 377348,
        hotel: privilege != "investor" ? 741983: 667784,
        airoport: privilege != "investor" ? 1017269 : 915542,
    }

    if (balance < priceBusinesses[msg.eventPayload.buyUpgrade]) {
        vkMsgKeyboard(userId, `⚠ Не хватает ${numberWithSpace(priceBusinesses[msg.eventPayload.buyUpgrade] - balance)} $\n🔥 Пополните на ${numberWithSpace((priceBusinesses[msg.eventPayload.buyUpgrade] - balance) / 16000)} рублей \n\n💳 Для быстрого пополнения нажмите на кнопку`, depInlineBoard)
        return vk.api.messages.sendMessageEventAnswer({
            event_id: eventId,
            user_id: userId,
            peer_id: peerId,
            event_data: JSON.stringify({
                'type': 'show_snackbar',
                'text': `❗ Вы не смогли купить точку`
            })
        })
    }

    vk.api.messages.sendMessageEventAnswer({
        event_id: eventId,
        user_id: userId,
        peer_id: peerId,
        event_data: JSON.stringify({
            'type': 'show_snackbar',
            'text': `✅ Вы успешно купили точку`
        })
    })

    setNewLastEarn(msg.senderId)
    plusBusinessUser(userId, msg.eventPayload.buyUpgrade)
    minusBalanceUser(userId, priceBusinesses[msg.eventPayload.buyUpgrade])
    addInvestedUser(userId, priceBusinesses[msg.eventPayload.buyUpgrade])
    vkMsgKeyboard(userId, '📊 Посмотрите свое место в топе', topInvested)

}
