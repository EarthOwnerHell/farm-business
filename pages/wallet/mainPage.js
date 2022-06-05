const { getGlobal } = require("../../database/manager/global")
const { numberWithSpace } = require("../../tools")
const { getRandomId } = require('vk-io')
const { groupId } = require('../../settings/config.json')


module.exports = mainPageWallet = async (msg) => {

    const { id, businesses, rubBalance, lastEarn, privilege, pet, petLevel } = msg.user
    const { percentCourse, buyCourse } = await getGlobal()

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

   const petPercent = {
         "None": 0,
         "rabbit": 0.03,
         "deer": 0.07,
         "penguin": 0.18,
         "dog": 0.26,
         "cat": 0.35
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
            countBusinesses += (earnBusinesses[business[0]] * business[1]) + ((earnBusinesses[business[0]] * business[1]) * petPercent[pet]) + ((earnBusinesses[business[0]] * business[1]) * (petLevel * 0.02))
            sumPrice += priceBusinesses[business[0]] * business[1]
        }

    })

    const timePassed = Date.now() - lastEarn;
    let earned$ = (Math.floor(timePassed * countBusinesses) / 86_400_000) + ((Math.floor(timePassed * countBusinesses) / 86_400_000) * petPercent[pet]) + ((Math.floor(timePassed * countBusinesses) / 86_400_000) * (petLevel * 0.02)) // Принесли
    privilege == "businessGig" ? earned$ = (Math.floor((timePassed * countBusinesses) / 86_400_000)) * 2 : null
    
    const carouselCases = JSON.stringify({
        type: 'carousel',
        elements: [
            {
                title: '⬆ Пополнить',
                description: `💵 Баланс: ${numberWithSpace(
                    earned$
                )} $\n\n📊 ${numberWithSpace(buyCourse)} $ = 1₽`,
                photo_id: '-209099203_457272395',
                buttons: [
                    {
                        action: {
                            type: 'open_link',
                            label: '⬆ Пополнить',
                            link: `https://vk.com/app6887721_-209099203#donate_10&op=1000`,
                        },
                    },
                ],
            },
            {
                title: '⬇ Вывод на QIWI',
                description: `❗️ Перед выводом не забудьте
идентифицировать QIWI-кошелёк\n\n⌛ На вывод: ${numberWithSpace(
                    earned$ / (16000+ (earned$ * percentCourse) / 100) 
                        +Number(rubBalance)
                )}₽`,
                photo_id: '-209099203_457272394',
                buttons: [
                    {
                        action: {
                            type: 'callback',
                            label: '⬇ Вывести',
                            payload: {
                                command: 'withdrawn',
                            },
                        },
                    },
                ],
            },
                       {
                title: '⬇ Вывод на ЮMONEY',
                description: `💵 Баланс: ${numberWithSpace(
                    earned$
                )} $\n\n⌛ На вывод: ${numberWithSpace(
                    earned$ / (16000+ (earned$ * percentCourse) / 100) 
                        +Number(rubBalance)
                )}₽`,
                photo_id: '-209099203_457272393',
                buttons: [
                    {
                        action: {
                            type: 'callback',
                            label: '⬇ Вывести',
                            payload: {
                                command: 'no',
                            },
                        },
                    },
                ],
            },
             {
                title: '⬇ Вывод VKCOIN',
                description: `💵 Баланс: ${numberWithSpace(
                    earned$
                )} $\n\n⌛ На вывод: ${numberWithSpace(
                    earned$ / (16000+ (earned$ * percentCourse) / 100) 
                        +Number(rubBalance)
                )}₽`,
                photo_id: '-209099203_457272392',
                buttons: [
                    {
                        action: {
                            type: 'callback',
                            label: '⬇ Вывести',
                            payload: {
                                command: 'no',
                            },
                        },
                    },
                ],
            },
            {
                title: '⬇ Вывод на карту',
                description: `💵 Баланс: ${numberWithSpace(
                    earned$
                )} $\n\n⌛ На вывод: ${numberWithSpace(
                    earned$ / (16000+ (earned$ * percentCourse) / 100) 
                        +Number(rubBalance)
                )}₽`,
                photo_id: '-209099203_457272391',
                buttons: [
                    {
                        action: {
                            type: 'callback',
                            label: '⬇ Вывести',
                            payload: {
                                command: 'no',
                            },
                        },
                    },
                ],
            },
            {
                title: '⬇ Вывод на номер',
                description: `💵 Баланс: ${numberWithSpace(
                    earned$
                )} $\n\n⌛ На вывод: ${numberWithSpace(
                    earned$ / (16000+ (earned$ * percentCourse) / 100) 
                        +Number(rubBalance)
                )}₽`,
                photo_id: '-209099203_457272390',
                buttons: [
                    {
                        action: {
                            type: 'callback',
                            label: '⬇ Вывести',
                            payload: {
                                command: 'no',
                            },
                        },
                    },
                ],
            },
        ],
    });

    msg.send({ message: 'Кошелек', template: carouselCases, random_id: getRandomId() })

}
