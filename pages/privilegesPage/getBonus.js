const { plusBalanceUser, setLastGetBonuses } = require('../../database/manager/user')
const { numberWithSpace } = require('../../tools')

module.exports = async(msg) => {
    const { privilege, lastGet } = msg.user
    const timePassed = Date.now() - lastGet
    if (timePassed < 86_400_00) return
    forBonus = {
        "elit": 50000,
        "investor": 100000, 
        "businessGig": 100000
    }
    plusBalanceUser(msg.senderId, forBonus[privilege])
    setLastGetBonuses(msg.senderId)
    return msg.send(`⭐ Выдан ежедневный бонус в размере ${numberWithSpace(forBonus[privilege])}`)

}
