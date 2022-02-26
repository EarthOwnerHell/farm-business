const { Keyboard } = require('vk-io')
const callBack = require('./callback')

const green  =  Keyboard.POSITIVE_COLOR
const blue = Keyboard.PRIMARY_COLOR
const red = Keyboard.NEGATIVE_COLOR
const grey = Keyboard.SECONDARY_COLOR

const textButton = (label, command = label, color = Keyboard.SECONDARY_COLOR) => (
    Keyboard.textButton({
        label,
        payload: { command },
        color,
    })
)

const adminButton = (label, admin = label, color = Keyboard.SECONDARY_COLOR) => (
    Keyboard.textButton({
        label,
        payload: { admin },
        color,
    })
)

const mainBoard = (admin) => (
    Keyboard.keyboard([
        [
            textButton('👤 Профиль', 'profile', green)  
        ],
        [
            textButton('💰 Финансы', 'finances', red),
            (textButton('🌾 Склад', "warehouse", red))
        ],
        [
            textButton('💸 Магазин', 'market', blue),
        ],
        [
            textButton('📊 Статистика', 'info', green), 
            textButton('💡 Реферальная система', 'ref', red), 
        ],
        admin ? [
            adminButton('Админка', 'admin', red)
        ] : [ ]
    ])
)

const adminMenu = Keyboard.keyboard([
    [
        adminButton('Новый бонус за репост', 'newBonus', blue)
    ],
    [
        adminButton('Рассылка', 'mailing', green)
    ],
    [
        adminButton('Выдать бан', 'giveBan', green)
    ],
    [
        adminButton('Выдать баланс', 'giveBalance', blue)
    ],
    [
        textButton('Назад', 'back', red)
    ]
])


module.exports = {
    mainBoard,
    adminMenu,
}
