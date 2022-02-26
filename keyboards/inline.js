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

    const privilegeKeyboardWithoutBonus = Keyboard.keyboard([
        [
            (textButton('💭 Сменить ник', "changeNick", Keyboard.NEGATIVE_COLOR,))
        ]
    ]).inline()
    
const lvlOfRefBoard = Keyboard.keyboard([
    [
        textButton('🚀 Система уровней', 'getRefsLvl', green)
    ]
]).inline()

const inlineProfileBoard = (qiwiChanged, avatarChanged) => (
    Keyboard.keyboard([
        [
            textButton(qiwiChanged ? '✏ Сменить QIWI номер' : '✏ Указать QIWI номер' , 'changeQiwi', qiwiChanged ? green : red)
        ],
        [
            textButton(avatarChanged ? '😎 Сменить персонажа' : '🎩 Выбрать персонажа', 'changeAvatar', avatarChanged ? green : red)
        ],
    ]).inline()
)

const inlineProfileBoardPrivilege = (qiwiChanged, avatarChanged) => (
    Keyboard.keyboard([
        [
            textButton(qiwiChanged ? '✏ Сменить QIWI номер' : '✏ Указать QIWI номер' , 'changeQiwi', qiwiChanged ? green : red)
        ],
        [
            textButton(avatarChanged ? '😎 Сменить персонажа' : '🎩 Выбрать персонажа', 'changeAvatar', avatarChanged ? green : red)
        ],
        [
            textButton('⚙ Управление привилегией', "managmentPrivilege", Keyboard.NEGATIVE_COLOR,)
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
]).inline()

const privilegesBuyButtons = Keyboard.keyboard([
    [
     (buyPrivilege('⭐ Элита', "elit", Keyboard.POSITIVE_COLOR)),
    ],
    [
     (buyPrivilege('🔥 Инвестор', "investor", Keyboard.NEGATIVE_COLOR)),
    ],
    [
     (buyPrivilege('🎩 Бизнес-гигант', "businessGig", Keyboard.PRIMARY_COLOR)),
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
        urlButton('🔗 Быстрое пополнение', `https://vk.com/app6887721_-209099092#donate_10&op_1000`)
    ]
]).inline()

const topInvested = Keyboard.keyboard([
    [
        textButton('📊 Топ по вложениям', 'topInvested', red)
    ]
]).inline()

const reviewMenu = Keyboard.keyboard([
    [
        urlButton('✏ Оставить отзыв', 'https://vk.com/topic-209099092_48256724')
    ]
]).inline()

const mailingMenu = Keyboard.keyboard([
    [
        urlButton('📝 Отзывы', 'https://vk.com/topic-209099092_48256724'),
        urlButton('📖 Обучение', 'https://m.vk.com/@badmoneybirds-zarabotok'),
    ],
    [
        urlButton(
            '💳 Быстрое пополнение',
            'https://vk.com/app6887721_-209099092#donate_10&op_1000'
        ),
    ],
    [urlButton('💬 Беседа', 'https://vk.me/join/AJQ1dynsnh/AyCJ4aeZVwRYU')],
]).inline();

module.exports = {
    lvlOfRefBoard,
    inlineProfileBoard,
    topBoard,
    noButtonBoard,
    backToProfile,
    depInlineBoard,
    topInvested,
    reviewMenu,
    mailingMenu,
    privilegesBuyButtons, 
    acceptButton,
    inlineProfileBoardPrivilege,
    privilegeKeyboard,
    privilegeKeyboardWithoutBonus
};
