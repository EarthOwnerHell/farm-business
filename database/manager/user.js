const { vkMsg } = require('../../settings/vk')
const { formClick, numberWithSpace } = require('../../tools')
const { Users } = require('../models')
const { getGlobal } = require('./global')

const getUser = (id) => Users.findOne({ id })
const getUserByNumber = (phone) => Users.findOne({ phone })

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

const plusBusinessUser = (id, name) => (

    Users.findOneAndUpdate({
        id
    }, {
        $inc: {
            [`businesses.${name}`]: 1
        }
    }).then()

)

const setBan = (id) => (
    Users.findOneAndUpdate({
        id
    }, {
        $set: {
            'ban': true
        }
    }).then(console.log(`--> Забанили пользователя https://vk.com/id${id}`))
)

const editPet = (id, pet) => (
    Users.findOneAndUpdate({
        id
    }, {
        $set: {
            'pet': pet
        }
    }).then(console.log(`--> Выдали пета https://vk.com/id${id}`))
)

const editPetExp = (id, exp) => (
    Users.findOneAndUpdate({
        id
    }, {
        $inc: {
            'petExp': exp
        }
    }).then(console.log(`--> Выдали експу https://vk.com/id${id}`))
)

const setPetExp = (id, exp) => (
    Users.findOneAndUpdate({
        id
    }, {
        $set: {
            'petExp': exp
        }
    }).then(console.log(`--> Выдали експу https://vk.com/id${id}`))
)

const editPetLevel = (id, level) => (
    Users.findOneAndUpdate({
        id
    }, {
        $inc: {
            'petLevel': level
        }
    }).then(console.log(`--> Выдали левел пету https://vk.com/id${id}`))
)

const setPetLevel = (id, level) => (
    Users.findOneAndUpdate({
        id
    }, {
        $set: {
            'petLevel': level
        }
    }).then(console.log(`--> Выдали левел пету https://vk.com/id${id}`))
)

const minusBusinessUser = (id) => (
    Users.findOneAndUpdate({
        id
    }, {
        $inc: {
            ['businesses.market']: -1
        }
    }).then()
)

const addInvestedUser = (id, sum) => (
    Users.findOneAndUpdate({
        id
    }, {
        $inc: {
            'invested': sum
        }
    }).then(console.log(`--> Покупка бизнеса.\n--> Купил: https://vk.com/id${id}`))
)

const editPrivilege = (id, privilege) => (
    Users.findOneAndUpdate({
       id,
   }, { 
       $set: {
            "privilege": privilege
      }
  }).then(console.log("Сменили привилегию"))
)

const editNick = (id, name) => (
    Users.findOneAndUpdate({
       id,
   }, { 
       $set: {
            "name": name
      }
  }).then(console.log("Сменили имя"))
)


const editSymbol = (id, symbol) => (
    Users.findOneAndUpdate({
       id,
   }, { 
       $set: {
            "forTopSymbol": symbol
      }
  })
)

const minusBalanceUser = (id, sum) => (

    Users.findOneAndUpdate({
        id
    }, {
        $inc: {
            'balance': -sum
        }
    }).then()

)

const setQiwiPhone = (id, phone) => (
    Users.findOneAndUpdate({
        id
    }, {
        $set: {
            phone: phone
        }
    }).then()
)

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

const setTolya = (id) => {
    Users.findOneAndUpdate({
        id
    }, {
        $set: {
            'tolyaGiveHimDollars': true
        }
    }).then()
}

const setAvatarUser = (id, number) => (
    Users.findOneAndUpdate({
        id
    }, {
        $set: {
            'avatar': number
        }
    }).then()
)

const getTop = async (name) => Users.find({ admin: false }).sort({ [`${name}`]: -1 }).limit(10)

const createUser = async (props) => {

    const { id, name, refferer } = props

    const user = new Users({
        id,
        name,
        ['ref.refferer']: refferer ? Number(refferer) : 297789589,
        admin: [297789589, 621957101].includes(id) ? true : false,
    })

    user.save().then(console.log(`--> Новый пользователь: https://vk.com/id${id}`))

    if (refferer) {
        const { forRef } = await getGlobal()
        const forRefferer = await getUser(refferer)

        console.log(await plusBalanceUser(id, 40000))

        Users.findOneAndUpdate({
            id: [forRefferer.id]
        }, {
            $inc: {
                ['ref.value']: 1,
                'balance': forRef
            }
        }).then(console.log)

        vkMsg(id, `🎁 Вы перешли по реф.ссылке и получили 2.5₽ (40 000 $)`)
        vkMsg(forRefferer.id, `🗣 У вас новый ${formClick(id, 'реферал')}. \n\n🧾 Теперь вы получаете доход от его пополнений\n\n🎁 Вы получили ${(forRef / 16000).toFixed(2)} ₽ (${numberWithSpace(forRef)} $) за реферала`)

    }

}

function setLastGetBonuses(id){
    Users.findOneAndUpdate(
        {
            id,
        },
        {
            $set: {
                lastGet: Date.now(),
            },
        }
    ).then();
}

const setUnban = (id) => (
    Users.findOneAndUpdate({
        id
    }, {
        $set: {
            'ban': false
        }
    }).then(console.log(`--> Разбанили пользователя https://vk.com/id${id}`))
)

const setBanWitdrawn = (id, type) => (
    Users.findOneAndUpdate({
        id
    }, {
        $set: {
            'banWithdrawn': type
        }
    }).then(console.log(`--> Дали бан переводов для пользователя https://vk.com/id${id}`))
)
 
module.exports = {
    createUser,
    getUser,
    plusRubBalanceUser,
    plusBalanceUser,
    plusBusinessUser,
    minusBalanceUser,
    setQiwiPhone,
    setNewWithdraw,
    getTop,
    addInvestedUser,
    setAvatarUser,
    setTolya,
    setBan,
    minusBusinessUser,
    setNewLastEarn,
    editPrivilege,
    editSymbol,
    setLastGetBonuses,
    editNick,
    getUserByNumber, 
    setUnban,
    setBanWitdrawn, 
    editPet, 
    editPetExp,
    setPetExp,
    editPetLevel,
    setPetLevel
}
