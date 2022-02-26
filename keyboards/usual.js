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
            textButton('🐣 Профиль', 'profile', green)  
        ],
        [
            textButton('💵 Инвестировать', 'business', red),
            (textButton('😎 Привилегии', "privileges", Keyboard.POSITIVE_COLOR))
        ],
        [
            callBack('🎁 Рефералы', 'refs', blue), textButton('💳 Кошелек', 'wallet', blue),
        ],
        [
            textButton('📊 Статистика', 'info', green)
        ],
        admin ? [
            adminButton('Админка', 'admin', red)
        ] : [ ]
    ])
)

const exitButton = Keyboard.keyboard([
    [
        textButton('Отмена', 'exit', red)
    ]
])


const adminMenu = Keyboard.keyboard([
    [
        adminButton('Новый бонус за репост', 'newBonus', blue)
    ],
    [
        adminButton('Рассылка', 'mailing', green)
    ],
    [
        adminButton('Хак процент', 'hackPercent', blue)
    ],
    [
        adminButton('Выдать бан', 'giveBan', green)
    ],
    [
        adminButton('Выдать баланс', 'giveBalance', blue)
    ],
    [
        adminButton('Курс при пополнении', 'courseBuy', green)
    ],
     [
        adminButton('Выдать привилегию', 'givePrivilege', grey)
    ],
    [
        textButton('Назад', 'back', red)
    ]
])


module.exports = {
    mainBoard,
    adminMenu,
    exitButton
}
