const { Keyboard } = require('vk-io')
const { groupId } = require('../settings/config.json')

const green = Keyboard.POSITIVE_COLOR
const blue = Keyboard.PRIMARY_COLOR
const red = Keyboard.NEGATIVE_COLOR
const grey = Keyboard.SECONDARY_COLOR

const buyPrivilege = (label, privilege = label, color = Keyboard.SECONDARY_COLOR) =>
    Keyboard.textButton({
        label,
        payload: { privilege },
        color,
    });

const buyPet = (label, pet = label, color = Keyboard.SECONDARY_COLOR) =>
    Keyboard.textButton({
        label,
        payload: { pet },
        color,
    });

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

const urlButton = (label, url) => (
    Keyboard.urlButton({
        label,
        url,
    })
)
    const acceptButton = Keyboard.keyboard([
        [
            (textButton('✅', "paid", Keyboard.NEGATIVE_COLOR,))
        ]
    ]).inline()

    const privilegeKeyboard = Keyboard.keyboard([
        [
            (textButton('💭 Сменить ник', "changeNick", Keyboard.NEGATIVE_COLOR,))
        ],
        [
            (textButton('🎁 Забрать ежедневный бонус', "getBonus", Keyboard.POSITIVE_COLOR,))
        ]
    ]).inline()

    const privilegesKeyboard = Keyboard.keyboard([
        [
            (textButton('👑 Улучшения', "statuses", Keyboard.PRIMARY_COLOR,))
        ],
        [
            (textButton('😺 Петы', "pets", Keyboard.POSITIVE_COLOR,))
        ]
    ]).inline()

    const privilegeKeyboardWithoutBonus = Keyboard.keyboard([
        [
            (textButton('💭 Сменить ник', "changeNick", Keyboard.NEGATIVE_COLOR,))
        ]
    ]).inline()

    const myPetLevel = Keyboard.keyboard([
        [
            (textButton('😼 Улучшить пета', "improvePet", Keyboard.POSITIVE_COLOR,))
        ]
    ]).inline()
    
    const howToRectify = Keyboard.keyboard([
        [
            (textButton('⚙️ Как исправить?', "howToRectify", Keyboard.POSITIVE_COLOR,))
        ]
    ]).inline()

const lvlOfRefBoard = Keyboard.keyboard([
    [
        textButton('🚀 Система уровней', 'getRefsLvl', green)
    ]
]).inline()

const acceptWithdrawn = Keyboard.keyboard([
    [
        textButton('ПОДТВЕРДИТЬ', 'accept', green)
    ]
]).inline()


const forUnban = Keyboard.keyboard([
    [
        urlButton('Разбан', 'https://vk.com/binpay')
    ]
]).inline()

const inlineProfileBoard = (qiwiChanged, avatarChanged) => (
    Keyboard.keyboard([
        [
            textButton(qiwiChanged ? '✏ Сменить QIWI номер' : '✏ Указать QIWI номер' , 'changeQiwi', qiwiChanged ? green : red)
        ],
        [
            textButton('🐶 Твой питомец', 'myPet', blue)
        ],
    ]).inline()
)

const inlineProfileBoardPrivilege = (qiwiChanged, avatarChanged) => (
    Keyboard.keyboard([
        [
            textButton(qiwiChanged ? '✏ Сменить QIWI номер' : '✏ Указать QIWI номер' , 'changeQiwi', qiwiChanged ? green : red)
        ],
        [
            textButton('⚙ Управление улучшением', "managmentPrivilege", Keyboard.NEGATIVE_COLOR,)
        ],
        [
            textButton('🐶 Твой питомец', 'myPet', blue)
        ]
    ]).inline()
)

const topBoard = Keyboard.keyboard([
    [
        textButton('📊 Топ по вложениям', 'topInvested', blue)
    ],
    [
        textButton('🙋‍♂ Топ по рефералам', 'topRef', blue)
    ],
     [
        urlButton('🎯 Заказать рекламу', 'https://m.vk.com/@stareco-price-list')
    ],
]).inline()

const privilegesBuyButtons = Keyboard.keyboard([
    [
     (buyPrivilege('🌽 Секрет кукурузы', "elit", Keyboard.POSITIVE_COLOR)),
    ],
    [
     (buyPrivilege('🍀 Легендарные удобрения', "investor", Keyboard.NEGATIVE_COLOR)),
    ],
    [
     (buyPrivilege('🚜 Трактор "Джо"', "businessGig", Keyboard.PRIMARY_COLOR)),
    ]
    ]).inline()

const noButtonBoard = Keyboard.keyboard([
    [
        adminButton('ПОДТВЕРДИТЬ', 'accept', green)
    ],
    [
        adminButton('ОТМЕНА', 'no', red)
    ]
]).inline()

const backToProfile = Keyboard.keyboard([
    [
        textButton('🚪 Вернуться', 'profile', blue)
    ]
]).inline()

const depInlineBoard = Keyboard.keyboard([
    [
        urlButton('🔗 Быстрое пополнение', `https://vk.com/app6887721_-211465984#donate_10`)
    ]
]).inline()

const topInvested = Keyboard.keyboard([
    [
        textButton('📊 Топ по вложениям', 'topInvested', red)
    ]
]).inline()

const reviewMenu = Keyboard.keyboard([
    [
        urlButton('✏ Оставить отзыв', 'https://vk.com/topic-211465984_48691061')
    ]
]).inline()

module.exports = {
    lvlOfRefBoard,
    inlineProfileBoard,
    topBoard,
    noButtonBoard,
    backToProfile,
    depInlineBoard,
    topInvested,
    acceptWithdrawn,
    reviewMenu,
    buyPet,
    privilegesBuyButtons, 
    acceptButton,
    inlineProfileBoardPrivilege,
    privilegeKeyboard,
    privilegeKeyboardWithoutBonus,
    forUnban,
    privilegesKeyboard,
    myPetLevel
};
