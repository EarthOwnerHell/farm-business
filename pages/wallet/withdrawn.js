const { getGlobal } = require("../../database/manager/global")
const { setNewWithdraw } = require("../../database/manager/user")
const { Dep } = require("../../database/models")
const { reviewMenu } = require("../../keyboards/inline")
const { sendPayment, getBalanceQiwi } = require("../../settings/qiwi")
const { vkMsg, vkMsgKeyboard, vk } = require('../../settings/vk')
const { formClick, numberWithSpace } = require("../../tools")
const userWithdraw = require('../../database/manager/withdraw')


module.exports = withdrawnMoney = async (msg) => {

    const { businesses, rubBalance, lastEarn, id, phone, ref: { value }, privilege, pet, petLevel } = msg.user
    const { eventId, userId, peerId } = msg 
    const { percentCourse } = await getGlobal()
    const balanceQiwi = await getBalanceQiwi()
    const firstDep = await Dep.findOne({ userId: id })
    // const withdraws = await userWithdraw.getLast(userId)
    // console.log(withdraws)

    // if (!firstDep && value < 5) return vkMsg(id, '😨 Вам надо пополнить счет бизнеса хотя бы на 1ОР или пригласить 5 человек по реф.ссылке, ведь рабочим тоже хочется кушать?')
    // if (value - countRefs > 3) return vkMsg(id, 'Вам надо пригласить 3-х рефералов для продолжения выводов, спасибо!')

    let countBusinesses = 0
    let sumPrice = 0

    const priceBusinesses = {
        market: privilege != "investor" ? 55792 : 50212,
        hospital: privilege != "investor" ? 114983 : 103484,
        motel: privilege != "investor" ? 235829 : 212246,
        theatre: privilege != "investor" ? 419276 : 377348,
        hotel: privilege != "investor" ? 741983: 667784,
        airoport: privilege != "investor" ? 1017269 : 915542,
    }
    
    const earnBusinesses = {
        market: 1200,
        hospital: 2820,
        motel: 6600,
        theatre: 13300,
        hotel: 26400,
        airoport: 41400
    }

    const petPercent = {
         "None": 0,
         "frog": 0.03,
         "fox": 0.07,
         "chick": 0.12,
         "tiger": 0.18,
         "cow": 0.26
    }

    Object.entries(businesses).forEach((business) => {
        
        if (business[1]) {
            countBusinesses += (earnBusinesses[business[0]] * business[1]) + ((earnBusinesses[business[0]] * business[1]) * petPercent[pet]) + ((earnBusinesses[business[0]] * business[1]) * (petLevel * 0.02))
            sumPrice += priceBusinesses[business[0]] * business[1]
        }

    })

    const timePassed = Date.now() - lastEarn;
    let earned$ = (Math.floor(timePassed * countBusinesses) / 86_400_000) + ((Math.floor(timePassed * countBusinesses) / 86_400_000) * petPercent[pet]) + ((Math.floor(timePassed * countBusinesses) / 86_400_000) * (petLevel * 0.02)) // Принесли
    privilege == "businessGig" ? earned$ = (Math.floor((timePassed * countBusinesses) / 86_400_000)) * 2 : null

    if (earned$ >= 1_000_000) {
        if (msg.user.privilege === 'businessGig' && earned$ >= 2_000_000) {
            earned$ = 2_000_000
        } else {
            earned$ = 1_000_000
        }
    }

    if (!phone) return vkMsg(id, '😨 Божечки-кошечки, кажется, вы не указали номер для вывода!\n😨 Сделайте это в профиле!')
    //if (earned$ / (16000+ (earned$ * percentCourse) / 100) + Number(rubBalance) < 5 ) return vkMsg(id, `😑 Вывод доступен от 5-ти рублей, подожди немного :)`)
if ((sumPrice / 16000) <= 51){
   if (earned$ / (16000+ (earned$ * percentCourse) / 100) + Number(rubBalance) < 3 ) return vkMsg(id, `😑 Вывод доступен от 3-ти рублей, подожди немного :)`)
} else if ((sumPrice / 16000) > 51 && (sumPrice / 16000) <= 121) {
   if (earned$ / (16000+ (earned$ * percentCourse) / 100) + Number(rubBalance) < 5 ) return vkMsg(id, `😑 Вывод доступен от 5-ти рублей, подожди немного :)`)
} else if ((sumPrice / 16000) > 121 && (sumPrice / 16000) <= 251) {
   if (earned$ / (16000+ (earned$ * percentCourse) / 100) + Number(rubBalance) < 6 ) return vkMsg(id, `😑 Вывод доступен от 6-ти рублей, подожди немного :)`)
} else if ((sumPrice / 16000) > 251 && (sumPrice / 16000) <= 401) {
   if (earned$ / (16000+ (earned$ * percentCourse) / 100) + Number(rubBalance) < 8 ) return vkMsg(id, `😑 Вывод доступен от 8-ти рублей, подожди немного :)`)
} else if ((sumPrice / 16000) > 401 && (sumPrice / 16000) <= 1001) {
   if (earned$ / (16000+ (earned$ * percentCourse) / 100) + Number(rubBalance) < 9 ) return vkMsg(id, `😑 Вывод доступен от 9-ти рублей, подожди немного :)`)
} else if ((sumPrice / 16000) > 1001 && (sumPrice / 16000) <= 2001) {
   if (earned$ / (16000+ (earned$ * percentCourse) / 100) + Number(rubBalance) < 10 ) return vkMsg(id, `😑 Вывод доступен от 10-ти рублей, подожди немного :)`)
} else if ((sumPrice / 16000) > 2001 && (sumPrice / 16000) <= 3001) {
   if (earned$ / (16000+ (earned$ * percentCourse) / 100) + Number(rubBalance) < 11 ) return vkMsg(id, `😑 Вывод доступен от 11-ти рублей, подожди немного :)`)
} else if ((sumPrice / 16000) > 3001) {
   if (earned$ / (16000+ (earned$ * percentCourse) / 100) + Number(rubBalance) < 12) return vkMsg(id, `😑 Вывод доступен от 12-ти рублей, подожди немного :)`)
}

    if (earned$ / (16000+ earned$ * percentCourse/100)  + Number(rubBalance) > balanceQiwi) return vkMsg(id, '😢 Похоже у нас не хватает баланса на QIWI :(\n\n🤔 Попробуйте позже')

    const res = await sendPayment(earned$ / (16000+ earned$ * percentCourse/100)  + Number(rubBalance), phone)
    
    const answer = await Promise.all([userWithdraw.create(id, earned$ / (16000+ earned$ * percentCourse/100) + Number(rubBalance), value), 
                    vkMsgKeyboard(id, `📝 Пожалуйста, оставьте свой отзыв`, reviewMenu), 
                    setNewWithdraw(id, earned$ + ( 16000* rubBalance))
                    ])
    
        vk.api.messages.sendMessageEventAnswer({
        event_id: eventId,
        user_id: userId,
        peer_id: peerId,
        event_data: JSON.stringify({
            'type': 'show_snackbar',
            'text': `🔥 Вывели [ ${numberWithSpace(earned$ / (16000+ earned$ * percentCourse/100) + Number(rubBalance))}₽ ] !`
        })
    })
}
