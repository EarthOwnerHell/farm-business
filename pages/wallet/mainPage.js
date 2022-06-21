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
         "frog": 0.03,
         "fox": 0.07,
         "chick": 0.12,
         "tiger": 0.18,
         "cow": 0.26
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
                photo_id: '-211465984_457239087',
                buttons: [
                    {
                        action: {
                            type: 'open_link',
                            label: '⬆ Пополнить',
                            link: `https://vk.com/app6887721_-211465984#donate_10&op=1000`,
                        },
                    },
                ],
            },
            {
                title: '⬇ Вывод на QIWI',
                description: `‼ Идентифицируйте киви перед выводом\n\n⌛ На вывод: ${numberWithSpace(
                    Math.round(
                    earned$ / (16000+ (earned$ * percentCourse) / 100) 
                        +Number(rubBalance)
                        )
                )}₽`,
                photo_id: '-211465984_457239088',
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
        ],
    });

    msg.send({ message: 'Кошелек', template: carouselCases, random_id: getRandomId() })

}
