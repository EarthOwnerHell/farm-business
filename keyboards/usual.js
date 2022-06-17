const { Keyboard } = require('vk-io')
const callBack = require('./callback')

const green  =  Keyboard.POSITIVE_COLOR
const blue = Keyboard.PRIMARY_COLOR
const red = Keyboard.NEGATIVE_COLOR
const grey = Keyboard.SECONDARY_COLOR

const makeButton = (label, command, color = Keyboard.SECONDARY_COLOR) => Keyboard.textButton({
    label,
    payload: {
      command
    },
    color
  })

const makeButtonUrl = (label, url) => Keyboard.urlButton({
    label,
    url
  })


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
            textButton('🖥 Личный кабинет', 'profile', green)  
        ],
        [
            textButton('🌾 Ферма', 'business', red),
            (textButton('👑 Привилегии', "privileges", Keyboard.POSITIVE_COLOR))
        ],
        [
            callBack('🎁 Приглашения', 'refs', blue), textButton('💵 Деньги', 'wallet', blue),
        ],
        [
            textButton('⚡️Информация о боте', 'info', green)
        ],
        admin ? [
            adminButton('Админка', 'admin', red)
        ] : [ ]
    ])
)

const gameBoard = Keyboard.keyboard([
    [makeButton('Банк', 'bank', Keyboard.NEGATIVE_COLOR), makeButton('Баланс', 'balance', Keyboard.NEGATIVE_COLOR)],
    [makeButton('1-12', '1-12', Keyboard.POSITIVE_COLOR), makeButton('13-24', '13-24', Keyboard.POSITIVE_COLOR), makeButton('25-36', '25-36', Keyboard.POSITIVE_COLOR)],
    [makeButton('Красное', 'red', Keyboard.NEGATIVE_COLOR), makeButton('Чёрный', 'black', Keyboard.SECONDARY_COLOR)],
    [makeButton('Чётное', 'even', Keyboard.PRIMARY_COLOR), makeButton('Нечётное', 'odd', Keyboard.PRIMARY_COLOR)],
    [makeButtonUrl('Пополнить', 'https://vk.com/app6887721_-209099092#donate_10&op_1000')],

  ]
  )

const exitButton = Keyboard.keyboard([
    [
        textButton('Отмена', 'exit', red)
    ]
])


const adminMenu = Keyboard.keyboard([
    [
        adminButton('Новый бонус за репост', 'newBonus', blue),
        adminButton('Cделать неактивной', 'makeUnactive', blue)
    ],
    [
        adminButton('Рассылка', 'mailing', green)
    ],
    [
        adminButton('Хак процент', 'hackPercent', blue)
    ],
    [
        adminButton('Выдать бан', 'giveBan', green),
        adminButton('Выдать разбан', 'giveUnban', green),
        adminButton('Выдать разбан переводов', 'giveUnbanWithdrawn', green),
    ],
    [
        adminButton('Выдать баланс', 'giveBalance', blue)
    ],
    [
        adminButton('Сумма за рефа', 'forRef', red)
    ],
    [
        adminButton('Курс при пополнении', 'courseBuy', green)
    ],
     [
        adminButton('Выдать привилегию', 'givePrivilege', grey),
        adminButton('Выдать пета', 'givePet', grey)
    ],
    
    [
        textButton('Назад', 'back', red)
    ]
])


module.exports = {
    mainBoard,
    adminMenu,
    exitButton,
    gameBoard
}
