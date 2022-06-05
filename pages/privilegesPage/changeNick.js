const { editNick } = require('../../database/manager/user')
const { getLength } = require('../../tools')

module.exports = async(msg) => {
const { name } = msg.user
const questionForName = await msg.question('☁ Введите новый никнейм (для отмена напишите «Отмена»)')
if (questionForName.text == name) return msg.send('❗У вас уже установлен такой ник.')
if (getLength(questionForName.text) > 20) return msg.send('❗Нельзя установить ник длинне 20 символов')
editNick(msg.senderId, questionForName.text)
return msg.send(`✅ Ник сменён на <<${questionForName.text}>>`)
}
