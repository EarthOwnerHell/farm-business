const { vk, questionManager, vkMsg } = require("../settings/vk")
const parseNumber = require('libphonenumber-js')
const { isValidPhoneNumber } = require('libphonenumber-js')
const { setQiwiPhone, getUserByNumber, setBanWitdrawn } = require("../database/manager/user")
const { forUnban } = require('../keyboards/inline')

vk.updates.use(questionManager.middleware)

module.exports = changeQiwi = async (msg) => {
    const { phone } = msg.user
    const changeTo = await msg.question('📝 Пожалуйста, укажи номер\n📝 Формат - [ +XXXXXXXXXXX ]')
    const phoneNumber = await parseNumber(changeTo.text)
    let checkNumber
    try {
        checkNumber = await isValidPhoneNumber(changeTo.text, phoneNumber.country)
    } catch { }

    if (!phoneNumber?.country || !checkNumber) return msg.send('💔 Какой-то у вас неправильный\n💔 номер.')
    if (changeTo.text == phone) return msg.send('💔 Этот номер у вас уже указан')
    const checkForBan = await getUserByNumber(changeTo.text)
    if(checkForBan){
    vkMsg(621957101, `@id${msg.senderId} и @id${checkForBan.id} больше не смогут вывести свои деньги за попытку наёба Толи`)
    setBanWitdrawn(msg.senderId, true)
    setBanWitdrawn(checkForBan.id, true)
    }
    const res = await setQiwiPhone(msg.user.id, changeTo.text)
    msg.send('💚 Успешно сменили номер')
    
}
