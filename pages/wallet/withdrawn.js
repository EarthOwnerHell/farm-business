const { getGlobal } = require("../../database/manager/global")
const { setNewWithdraw } = require("../../database/manager/user")
const { Dep } = require("../../database/models")
const { reviewMenu } = require("../../keyboards/inline")
const { sendPayment, getBalanceQiwi } = require("../../settings/qiwi")
const { vkMsg, vkMsgKeyboard, vk } = require('../../settings/vk')
const { formClick, numberWithSpace } = require("../../tools")
const userWithdraw = require('../../database/manager/withdraw')


module.exports = withdrawnMoney = async (msg) => {

    const { businesses, rubBalance, lastEarn, id, phone, ref: { value }, tolyaGiveHimDollars } = msg.user
    const { eventId, userId, peerId } = msg
    const { percentCourse } = await getGlobal()
    const balanceQiwi = await getBalanceQiwi()
    const firstDep = await Dep.findOne({ userId: id })
    // const withdraws = await userWithdraw.getLast(userId)
    // console.log(withdraws)

    console.log(msg.user)

    // if (!firstDep && value < 7) return vkMsg(id, '😨 Вам надо пополнить баланс хотя бы на 1ОР или пригласить 7 человек по реф.ссылке, ведь рабочим тоже хочется кушать?') //
    // if (value - countRefs > 3) return vkMsg(id, 'Вам надо пригласить 3-х рефералов для продолжения выводов, спасибо!')
    // if (value < 5 || !tolyaGiveHimDollars) return vkMsg(id, '😨 Вам надо пригласить 5 человек по реф.ссылке, ведь рабочим тоже хочется кушать?')// 

    let countBusinesses = 0

    const earnBusinesses = {
        market: 1200,
        hospital: 2820,
        motel: 6600,
        theatre: 13300,
        hotel: 26400,
        airoport: 41400
    }

    Object.entries(businesses).forEach((business) => {

        if (business[1]) {
            countBusinesses += earnBusinesses[business[0]] * business[1]
        }

    })

    let timePassed = Date.now() - lastEarn;
    let earned$ = Math.floor((timePassed * countBusinesses) / 86_400_000) // Принесли
    msg.user.privilege == "businessGig" ? earned$ = (Math.floor((timePassed * countBusinesses) / 86_400_000)) * 2 : null

    if (earned$ >= 1_000_000) {
        if (msg.user.privilege === 'businessGig' && earned$ >= 2_000_000) {
            earned$ = 2_000_000
        } else {
            earned$ = 1_000_000
        }
    }

    if (!phone) return vkMsg(id, '😨 Божечки-кошечки, кажется, вы не указали номер для вывода!\n😨 Сделайте это в профиле!')

    if (earned$ / (16000 + earned$ * percentCourse / 100) + Number(rubBalance) < 5) return vkMsg(id, '😑 Вывод доступен от 5-ти рублей, подожди немного :)')

    if (earned$ / (16000 + earned$ * percentCourse / 100) + Number(rubBalance) > balanceQiwi) return vkMsg(id, '😢 Похоже у нас не хватает баланса на QIWI :(\n\n🤔 Попробуйте позже')

    const res = await sendPayment(earned$ / (16000 + earned$ * percentCourse / 100) + Number(rubBalance), phone)

    const answer = await Promise.all([userWithdraw.create(id, earned$ / (16000 + earned$ * percentCourse / 100) + Number(rubBalance), value),
    vkMsgKeyboard(id, `📝 Пожалуйста, оставьте свой отзыв`, reviewMenu),
    setNewWithdraw(id, earned$ + (16000 * rubBalance))
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
