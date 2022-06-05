const { setBanWitdrawn, setQiwiPhone } = require('../../database/manager/user')
const { vk, questionManager, getId } = require('../../settings/vk')
const { formClick } = require('../../tools')

vk.updates.use(questionManager.middleware)

module.exports = async (msg) => {

    const percent = await msg.question('Вставьте ссылку на профиль')

    const userId = await getId(percent.text)

    if (!userId.id || userId.type !== 'user') return msg.send('Ошибка, проверь вводимые данные')

    msg.send(`Успешно разбанили переводы ${formClick(userId.id, 'пользователю')}`)
    
    setBanWitdrawn(userId.id, false)
    setQiwiPhone(userId.id, "")

}
