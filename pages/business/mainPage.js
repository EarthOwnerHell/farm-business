module.exports = businessPage = async (msg) => {

    const { id, businesses: { market, hospital, motel, theatre, hotel, airoport }, privilege } = msg.user

    const addElement = (title, count, forBuy, profit, photo_id, firstPayload, secondPayload) => ({
        title: `${title} (x${count})`,
        description: `💳 Цена: ${forBuy} $\n⌛ Прибыль: ${profit} $ в сутки`,
        photo_id: `-${photo_id}`,
        "buttons": [
            {
                "action": {
                    "type": "callback",
                    "label": "💬 Подробная информация",
                    "payload": {
                        infoUpgrade: `${firstPayload}`
                    },
                },
            },
            {
                "action": {
                    "type": "callback",
                    "label": "💰 Приобрести точку",
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
                '🏪 Магазин',
                `${market}`,
                `55792`,
                '1200',
                '209099203_457272389',
                'getFirstInfo',
                'market'
            ),

            addElement(
                '🏥 Госпиталь',
                `${hospital}`,
                `114983`,
                '2820',
                '209099203_457272388',
                'getSecondInfo',
                'hospital'
            ),

            addElement(
                '🏘 Мотель',
                `${motel}`,
                `235829`,
                '6600',
                '209099203_457272387',
                'getThirdInfo',
                'motel'
            ),

            addElement(
                '🏛 Театр',
                `${theatre}`,
                `419276`,
                '13300',
                '209099203_457272386',
                'getFourthInfo',
                'theatre'
            ),

            addElement(
                '🏬 Отель',
                `${hotel}`,
                `741983`,
                '26400',
                '209099203_457272385',
                'getFivthInfo',
                'hotel'
            ),

            addElement(
                '✈ Аэропорт',
                `${airoport}`,
                "1017269",
                '41400',
                '209099203_457272384',
                'getSixthInfo',
                'airoport'
            ),
        ],
    });

    const businessCarouselInvestor = JSON.stringify({
        type: 'carousel',
        elements: [
            addElement(
                '🏪 Магазин',
                `${market}`,
                "50212",
                '1200',
                '209099203_457272389',
                'getFirstInfo',
                'market'
            ),

            addElement(
                '🏥 Госпиталь',
                `${hospital}`,
                "103484",
                '2820',
                '209099203_457272388',
                'getSecondInfo',
                'hospital'
            ),

            addElement(
                '🏘 Мотель',
                `${motel}`,
                "212246",
                '6600',
                '209099203_457272387',
                'getThirdInfo',
                'motel'
            ),

            addElement(
                '🏛 Театр',
                `${theatre}`,
                "377348",
                '13300',
                '209099203_457272386',
                'getFourthInfo',
                'theatre'
            ),

            addElement(
                '🏬 Отель',
                `${hotel}`,
                '667784',
                '26400',
                '209099203_457272385',
                'getFivthInfo',
                'hotel'
            ),

            addElement(
                '✈ Аэропорт',
                `${airoport}`,
                "915542",
                '41400',
                '209099203_457272384',
                'getSixthInfo',
                'airoport'
            ),
        ],
    });

    msg.send('Инвестирование', {
        template: privilege == "investor" ? businessCarouselInvestor : businessCarousel
    })

}
