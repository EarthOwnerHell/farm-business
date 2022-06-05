const userWithdraw = require('../../database/manager/withdraw')
const { messageEdit, getLastBotMessage, vk } = require('../../settings/vk')
const { numberWithSpace } = require("../../tools")
const { sendPayment } = require("../../settings/qiwi")
const { reviewMenu } = require("../../keyboards/inline")
const { setNewWithdraw } = require("../../database/manager/user")
const { getGlobal } = require("../../database/manager/global")

module.exports = async(msg) => {
    const { id, rubBalance, ref: { value }, privilege, businesses, lastEarn, phone} = msg.user
    const { eventId, userId, peerId } = msg
    const { percentCourse } = await getGlobal()
    let countBusinesses = 0
    let sumPrice = 0

    const earnBusinesses = {
        market: 1200,
        hospital: 2820, 
        motel: 6600,
        theatre: 13300,
        hotel: 26400,
        airoport: 41400
    }

    const priceBusinesses = {
        market: privilege != "investor" ? 55792 : 50212,
        hospital: privilege != "investor" ? 114983 : 103484,
        motel: privilege != "investor" ? 235829 : 212246,
        theatre: privilege != "investor" ? 419276 : 377348,
        hotel: privilege != "investor" ? 741983: 667784,
        airoport: privilege != "investor" ? 1017269 : 915542,
    }

    Object.entries(businesses).forEach((business) => {
        
        if (business[1]) {
            countBusinesses += earnBusinesses[business[0]] * business[1]
            sumPrice += priceBusinesses[business[0]] * business[1]
        }

    })  
    const timePassed = Date.now() - lastEarn;
    let earned$ = (Math.floor(timePassed * countBusinesses) / 86_400_000) // Принесли
    privilege == "businessGig" ? earned$ = (Math.floor((timePassed * countBusinesses) / 86_400_000)) * 2 : null
    const message_id = await getLastBotMessage(id)
    const res = await sendPayment(earned$ / (16000+ (earned$ * percentCourse) / 100) + Number(rubBalance), phone)
    setNewWithdraw(id, earned$ + (16000 * rubBalance))
    const answer = await Promise.all([userWithdraw.create(id, earned$ / earned$ / (16000+ (earned$ * percentCourse) / 100) + Number(rubBalance), value),
    messageEdit({
        peer_id: id,
        message_id,
        message: `🔥 Успешно вывели`,
    }),
    vkMsgKeyboard(id, `📝 Пожалуйста, оставьте свой отзыв`, reviewMenu),
    ])

    vk.api.messages.sendMessageEventAnswer({
        event_id: eventId,
        user_id: userId,
        peer_id: peerId,
        event_data: JSON.stringify({
            'type': 'show_snackbar',
            'text': `🔥 Вывели [ ${numberWithSpace(earned$ / (16000 + earned$ * percentCourse / 100) + Number(rubBalance))}₽ ] !`
        })
    })
}
