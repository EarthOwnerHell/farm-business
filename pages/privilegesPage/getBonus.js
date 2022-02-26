const { plusBalanceUser, setLastGetBonuses } = require('../../database/manager/user')
const { numberWithSpace } = require('../../tools')

module.exports = async(msg) => {
    const { privilege } = msg.user
    forBonus = {
        "elit": 50000,
        "investor": 100000, 
        "businessGig": 100000
    }
    plusBalanceUser(msg.senderId, forBonus[privilege])
    setLastGetBonuses(msg.senderId)
    return msg.send(`⭐ Выдан ежедневный бонус в размере ${numberWithSpace(forBonus[privilege])}`)

}
