const { vk, questionManager } = require("../settings/vk")
const parseNumber = require('libphonenumber-js')
const { isValidPhoneNumber } = require('libphonenumber-js')
const { setQiwiPhone } = require("../database/manager/user")

vk.updates.use(questionManager.middleware)

module.exports = changeQiwi = async (msg) => {

    const changeTo = await msg.question('📝 Пожалуйста, укажи номер\n📝 Формат - [ +XXXXXXXXXXX ]')

    const phoneNumber = await parseNumber(changeTo.text)
    let checkNumber
    try {
        checkNumber = await isValidPhoneNumber(changeTo.text, phoneNumber.country)
    } catch { }

    if (!phoneNumber?.country || !checkNumber) return msg.send('💔 Какой-то у вас неправильный\n💔 номер.')

    const res = await setQiwiPhone(msg.user.id, changeTo.text)

    msg.send('💚 Успешно сменили номер')
    
}