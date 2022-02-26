const { setNewPercent } = require('../../database/manager/global')
const { vk, questionManager } = require('../../settings/vk')

vk.updates.use(questionManager.middleware)

module.exports = hackPercent = async (msg) => {

    const percent = await msg.question('Введите новый процент для scamming shit')

    if (!Number(percent.text)) return msg.send('Что то не получилось, проверь вводимые данные')

    msg.send(`Успешно сменили на ${percent.text}`)
    
    setNewPercent(Number(percent.text))

}