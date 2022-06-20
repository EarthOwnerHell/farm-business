module.exports = businessPage = async (msg) => {

    const { id, businesses: { market, hospital, motel, theatre, hotel, airoport }, privilege } = msg.user

    const addElement = (title, count, forBuy, profit, photo_id, secondPayload) => ({
        title: `${title} (x${count})`,
        description: `💳 Цена: ${forBuy} $\n⌛ Прибыль: ${profit} $ в сутки`,
        photo_id: `-${photo_id}`,
        "buttons": [
            {
                "action": {
                    "type": "callback",
                    "label": "💰 Приобрести ферму",
                    "payload": {
                        buyUpgrade: `${secondPayload}`
                    },
                },
            },
        ]
    })

    const businessCarousel = JSON.stringify({
        type: 'carousel',
        elements: [
            addElement(
                '🥕 Морковь',
                `${market}`,
                `55792`,
                '1200',
                '211465984_457239027',
                'market'
            ),

            addElement(
                '🌾 Пшеница',
                `${hospital}`,
                `114983`,
                '2820',
                '211465984_457239028',
                'hospital'
            ),

            addElement(
                '🎃 Тыква',
                `${motel}`,
                `235829`,
                '6600',
                '211465984_457239029',
                'motel'
            ),

            addElement(
                '🥦 Броколли',
                `${theatre}`,
                `419276`,
                '13300',
                '211465984_457239030',
                'theatre'
            ),

            addElement(
                '🍅 Томаты',
                `${hotel}`,
                `741983`,
                '26400',
                '211465984_457239031',
                'hotel'
            ),

            addElement(
                '🌽 Кукуруза',
                `${airoport}`,
                "1017269",
                '41400',
                '211465984_457239032',
                'airoport'
            ),
        ],
    });

    const businessCarouselInvestor = JSON.stringify({
        type: 'carousel',
        elements: [
            addElement(
                '🥕 Морковь',
                `${market}`,
                `50212`,
                '1200',
                '211465984_457239027',
                'market'
            ),

            addElement(
                '🌾 Пшеница',
                `${hospital}`,
                `103484`,
                '2820',
                '211465984_457239028',
                'hospital'
            ),

            addElement(
                '🎃 Тыква',
                `${motel}`,
                `212246`,
                '6600',
                '211465984_457239029',
                'motel'
            ),

            addElement(
                '🥦 Броколли',
                `${theatre}`,
                `377348`,
                '13300',
                '211465984_457239030',
                'theatre'
            ),

            addElement(
                '🍅 Томаты',
                `${hotel}`,
                `667784`,
                '26400',
                '211465984_457239031',
                'hotel'
            ),

            addElement(
                '🌽 Кукуруза',
                `${airoport}`,
                "915542",
                '41400',
                '211465984_457239032',
                'airoport'
            ),
        ],
    });

    msg.send('Инвестирование', {
        template: privilege == "investor" ? businessCarouselInvestor : businessCarousel
    })

}
