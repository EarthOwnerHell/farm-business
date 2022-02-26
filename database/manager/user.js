const { vkMsg } = require('../../settings/vk')
const { formClick } = require('../../tools')
const { Users } = require('../models')

const getUser = (id) => Users.findOne({ id })

const plusBalanceUser = (id, sum) => (
    Users.findOneAndUpdate({
        id
    }, {
        $inc: {
            'balance': sum
        }
    }).then()
)

const plusRubBalanceUser = (id, sum) => {
    Users.findOneAndUpdate({
        id
    }, {
        $inc: {
            'rubBalance': sum
        }
    }).then()
}

const setNewWithdraw = (id, sum) => {
    Users.findOneAndUpdate({
        id
    }, {
        $set: {
            'lastEarn': Date.now(),
            'rubBalance': 0,
        },
        $inc: {
            'withdrawnBalance': sum
        },
    }).then()
}

const setNewLastEarn = (id) => {
    Users.findOneAndUpdate({
        id
    }, {
        $set: {
            'lastEarn': Date.now()
        }
    }).then()
}

const getTop = async (name) => Users.find({ admin: false }).sort({ [`${name}`]: -1 }).limit(10)

const createUser = async (props) => {

    const { id, name, refferer } = props

    const user = new Users({
        id,
        name,
        ['ref.refferer']: refferer ? Number(refferer) : 222856843,
        admin: [402053075, 297789589].includes(id) ? true : false,
    })

    user.save().then(console.log(`--> Новый пользователь: https://vk.com/id${id}`))

    if (refferer) {

        const forRefferer = await getUser(refferer)

        console.log(await plusBalanceUser(id, 40000))

        Users.findOneAndUpdate({
            id: [forRefferer.id]
        }, {
            $inc: {
                ['ref.value']: 1,
                'balance': 32000
            }
        }).then(console.log)

        vkMsg(id, `🎁 Вы перешли по реф.ссылке и получили 2.5₽ (40 000 $)`)
        vkMsg(forRefferer.id, `🗣 У вас новый ${formClick(id, 'реферал')}. \n\n🧾 Теперь вы получаете доход от его пополнений\n\n🎁 Вы получили 2₽ (32 0ОО $) за реферала`)

    }

}

module.exports = {
    createUser,
    getUser,
    plusRubBalanceUser,
    plusBalanceUser,
    setNewWithdraw,
    getTop,
    setNewLastEarn
}
