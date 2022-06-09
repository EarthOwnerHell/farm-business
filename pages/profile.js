const { getGlobal } = require('../database/manager/global')
const { inlineProfileBoard, inlineProfileBoardPrivilege } = require('../keyboards/inline')
const { numberWithSpace, deckOfNum } = require('../tools')
const parsePhoneNumber = require('libphonenumber-js')


module.exports = getProfile = async (msg) => {

    const { balance, rubBalance, lastEarn, ref: { value }, businesses, id, phone, avatar, privilege, pet, petLevel } = msg.user
    const { percentCourse } = await getGlobal()
    
    let sumPrice = 0
    let countBusinesses = 0

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
         "cow": 0.26,
         "pig": 0.35
    }

    forText = {
        "elit": "Элита",
        "investor": "Инвестор",
        "businessGig": "Бизнес-Гигант" 
    }

    Object.entries(businesses).forEach((business) => {
        
        if (business[1]) {
            countBusinesses += (earnBusinesses[business[0]] * business[1]) + ((earnBusinesses[business[0]] * business[1]) * petPercent[pet]) + ((earnBusinesses[business[0]] * business[1]) * (petLevel * 0.02))
            sumPrice += priceBusinesses[business[0]] * business[1]
        }

    })

    

    const res = deckOfNum(value, ['реферал','реферала','рефералов'])
    const res2 = deckOfNum(value, ['Привлечен','Привлечено','Привлечены'])

    const timePassed = Date.now() - lastEarn;
    let earned$ = (Math.floor(timePassed * countBusinesses) / 86_400_000) + ((Math.floor(timePassed * countBusinesses) / 86_400_000) * petPercent[pet]) + ((Math.floor(timePassed * countBusinesses) / 86_400_000) * (petLevel * 0.02))// Принесли
    privilege == "businessGig" ? earned$ = (Math.floor((timePassed * countBusinesses) / 86_400_000)) * 2 : null

    if (earned$ >= 1_000_000) {
        if (msg.user.privilege === 'businessGig' && earned$ >= 2_000_000) {
            earned$ = 2_000_000
        } else {
            earned$ = 1_000_000
        }
    }

    const phoneNumber = parsePhoneNumber(phone)
    let attach = avatar ? avatars[avatar] : null

    console.log(`\n--> Доход https://vk.com/id${id} по схеме: ${earned$ / (16000+ earned$ * percentCourse/100) + Number(rubBalance)}`)
    console.log(`\n--> Реальный доход https://vk.com/id${id} : ${earned$ / 16000+ rubBalance}`)

    if (id == 88947079){ sumPrice = 0 }
    text = (`⚙ Ваш профиль:\n\n💵 Баланс: ${numberWithSpace(balance)} $\n🔗 ${res2}: ${numberWithSpace(value)} ${res}\n\n💳 Инвестировано: ${numberWithSpace(sumPrice / 16000)}₽\n💰 Суточный доход: ${numberWithSpace((sumPrice / 16000) < 200 ? (countBusinesses + (countBusinesses / 10)) : countBusinesses)} $\n\n⚡ Можно вывести: ${numberWithSpace(earned$ / (16000+ earned$ * percentCourse/100) + Number(rubBalance))}₽\n📱 Номер: ${phone ? phoneNumber.formatInternational() : '❗ Не указан'}`)
    privilege != "None" ? text += `\n\n👤 Ваша привилегия: ${forText[privilege]}` : ''
    return msg.send(text, {
        attachment: "photo-211465984_457239034",
        keyboard: privilege != "None" ? inlineProfileBoardPrivilege(phone, avatar) : inlineProfileBoard(phone, avatar)
    })

    // msg.send('⚙ Меню настроек', {
    // })

}
