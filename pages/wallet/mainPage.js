const { getGlobal } = require("../../database/manager/global")
const { numberWithSpace } = require("../../tools")
const { getRandomId } = require('vk-io')
const { groupId } = require('../../settings/config.json')


module.exports = mainPageWallet = async (msg) => {

    const { businesses, rubBalance, lastEarn, privilege } = msg.user
    const { percentCourse, buyCourse } = await getGlobal()

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

    const timePassed = Date.now() - lastEarn;
    let earned$ = Math.floor((timePassed * countBusinesses) / 86_400_000) // Принесли
    privilege == "businessGig" ? earned$ = (Math.floor((timePassed * countBusinesses) / 86_400_000)) * 2 : null

    

    const carouselCases = JSON.stringify({
        type: 'carousel',
        elements: [
            {
                title: '⬆ Пополнить',
                description: `💵 Баланс: ${numberWithSpace(
                    earned$
                )} $\n\n📊 ${numberWithSpace(buyCourse)} $ = 1₽`,
                photo_id: '-209099092_457239124',
                buttons: [
                    {
                        action: {
                            type: 'open_link',
                            label: '⬆ Пополнить',
                            link: `https://vk.com/app6887721_-209099092#donate_10&op_1000`,
                        },
                    },
                ],
            },
            {
                title: '⬇ Вывести',
                description: `💵 Баланс: ${numberWithSpace(
                    earned$
                )} $\n\n⌛ На вывод: ${numberWithSpace(
                    earned$ / (16000+ (earned$ * percentCourse) / 100) +
                        Number(rubBalance)
                )}₽`,
                photo_id: '-209099092_457239123',
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
