const { getGlobal } = require('../database/manager/global')
const { inlineProfileBoard, inlineProfileBoardPrivilege } = require('../keyboards/inline')
const { numberWithSpace, deckOfNum } = require('../tools')
const parsePhoneNumber = require('libphonenumber-js')


module.exports = getProfile = async (msg) => {
    const { name, territoryLevel, balance } = msg.user
   /* const timePassed = Date.now() - lastEarn;
    let earned$ = Math.floor((timePassed * countBusinesses) / 86_400_000) // Принесли
    privilege == "businessGig" ? earned$ = (Math.floor((timePassed * countBusinesses) / 86_400_000)) * 2 : null
   */
   /* const phoneNumber = parsePhoneNumber(phone) */
   const toWithdrawn = 0
   return msg.send(
`
🧑🏻‍🌾 ${name}, твой профиль:

💰 Баланс: ${numberWithSpace(balance.toFixed(2))} €

👁 Уровень участка: ${territoryLevel}
💎 Можно вывести: ${toWithdrawn.toFixed(2)} ₽
`
   )
}