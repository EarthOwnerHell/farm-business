const { getGlobal } = require('../database/manager/global')
const { inlineProfileBoard, inlineProfileBoardPrivilege } = require('../keyboards/inline')
const { numberWithSpace, deckOfNum } = require('../tools')
const parsePhoneNumber = require('libphonenumber-js')


module.exports = getProfile = async (msg) => {

    const { balance, rubBalance, lastEarn, ref: { value }, businesses, id, phone, avatar, privilege } = msg.user
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

    const avatars = {
        1: 'photo-209099092_457239082',
        2: 'photo-209099092_457239083',
        3: 'photo-209099092_457239084',
        4: 'photo-209099092_457239085',
    };

    forText = {
        "elit": "Элита",
        "investor": "Инвестор",
        "businessGig": "Бизнес-Гигант" 
    }

    Object.entries(businesses).forEach((business) => {
        
        if (business[1]) {
            countBusinesses += earnBusinesses[business[0]] * business[1]
            sumPrice += priceBusinesses[business[0]] * business[1]
        }

    })

    const res = deckOfNum(value, ['реферал','реферала','рефералов'])
    const res2 = deckOfNum(value, ['Привлечен','Привлечено','Привлечены'])

    const timePassed = Date.now() - lastEarn;
    let earned$ = Math.floor((timePassed * countBusinesses) / 86_400_000) // Принесли
    privilege == "businessGig" ? earned$ = (Math.floor((timePassed * countBusinesses) / 86_400_000)) * 2 : null

    const phoneNumber = parsePhoneNumber(phone)
    let attach = avatar ? avatars[avatar] : null

    console.log(`\n--> Доход https://vk.com/id${id} по схеме: ${earned$ / (16000+ earned$ * percentCourse/100) + Number(rubBalance)}`)
    console.log(`\n--> Реальный доход https://vk.com/id${id} : ${earned$ / 16000+ rubBalance}`)
    
    text = (`⚙ Ваш профиль:\n\n💵 Баланс: ${numberWithSpace(balance)} $\n🔗 ${res2}: ${numberWithSpace(value)} ${res}\n\n💳 Инвестировано: ${numberWithSpace(sumPrice / 16000)}₽\n💰 Суточный доход: ${numberWithSpace(countBusinesses)} $\n\n⚡ Можно вывести: ${numberWithSpace(earned$ / (16000+ earned$ * percentCourse/100) + Number(rubBalance))}₽\n📱 Номер: ${phone ? phoneNumber.formatInternational() : '❗ Не указан'}\n\n${earned$ < 250_000 ? '🟢' 
    : earned$ < 500_000 ? '🟡' 
    : earned$ < 750_000 ? '🟠'
    : '🔴'} На складе:\n${numberWithSpace(earned$)} из ${privilege == "businessGig" ? "2 000 000" : "1 000 000"} $`)
    privilege != "None" ? text += `\n\n👤 Ваша привилегия: ${forText[privilege]}` : ''
    console.log(privilege)
    return msg.send(text, {
        attachment: attach,
        keyboard: privilege != "None" ? inlineProfileBoardPrivilege(phone, avatar) : inlineProfileBoard(phone, avatar)
    })

    // msg.send('⚙ Меню настроек', {
    // })

}