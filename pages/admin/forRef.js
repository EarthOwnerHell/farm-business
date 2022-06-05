const { setForRef } = require('../../database/manager/global')
const { vk, questionManager } = require('../../settings/vk')

vk.updates.use(questionManager.middleware)

module.exports = async (msg) => {

    const sum = await msg.question('Введите новую сумму за рефа')

    if (!Number(sum.text)) return msg.send('Что то не получилось, проверь вводимые данные')

    msg.send(`Успешно сменили на ${sum.text}`)
    
    setForRef(Number(sum.text))

}
