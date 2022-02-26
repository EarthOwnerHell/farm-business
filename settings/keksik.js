const { getDep, newDep } = require('../database/manager/dep')
const { vkMsg, vkMsgForPrivileges } = require('./vk')
const { numberWithSpace, formClick } = require('../tools')
const { getUser, plusRubBalanceUser, plusBalanceUser } = require('../database/manager/user')
const { getGlobal } = require('../database/manager/global')
const { mainBoard } = require('../keyboards/usual')
const user = require('../managers/user')

module.exports = newDonate = async (id, userId, amount) => {

    const dep = await getDep(id)

    /*if (amount == 12 && buyPrivilegeStatus == "wantBuy" && userId == 297789589){
        forPrivSymbol = {
            12: "⭐",
            2: '🔥',
            2.50: '🎩'
        }
        console.log(forPrivSymbol)
        forEdit = {
            12: "elit",
            2: "investor",
            2.50: "businessGig"
        }
        editPrivilege(userId, forEdit[amount])
        editSymbol(userId, forPrivSymbol[amount])
        editStatus(userId, "No")
        setLastGetBonuses(userId)
        vkMsgForPrivileges(userId, "✅✅✅ Успешная покупка привилегии!\n💫 Забирать бонусы можно через кнопку <<Профиль>>", { keyboard: mainBoard(false) })
        return vkMsg(297789589, `${userId} купил привилегию`)
    }*/

    if (dep) return

    const { ref: { refferer }, buyPrivilegeStatus } = await getUser(userId)

    const forRefferer = await getUser(refferer)
    const { buyCourse } = await getGlobal()

    const sumForRefferer = amount * forRefferer.ref.value < 10 ? 0.03
        : forRefferer.ref.value < 20 ? 0.04
            : forRefferer.ref.value < 30 ? 0.05
                : forRefferer.ref.value < 40 ? 0.06
                    : 0.07

    const addDep = await newDep({ id: Number(id), userId: Number(userId), sum: Number(amount) })

    vkMsg(
        userId,
        `✅ Успешное пополнение [ ${numberWithSpace(
            amount
        )}₽ ] !\n\n🤑 Начислено [ ${numberWithSpace(amount * buyCourse)} $ ]`, 'photo-210887504_457239127'
    );
    vkMsg(forRefferer.id, `🎉 Ваш ${formClick(userId, 'реферал')} пополнил баланс.\n\n🎁 Вам начислено ${numberWithSpace(amount * sumForRefferer)} рубля`)
    vkMsg(479647111, `${formClick(userId, 'Пользователь')} пополнил на ${numberWithSpace(amount)} рублей и получил ${numberWithSpace(amount * 16000)} $\n\nЕго ${formClick(forRefferer.id, 'Рефферер')} получил ${numberWithSpace(amount * sumForRefferer)} рублей`)

    plusRubBalanceUser(forRefferer.id, amount * sumForRefferer)
    plusBalanceUser(Number(userId), Number(amount * buyCourse));


}
