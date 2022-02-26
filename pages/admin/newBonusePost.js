const { addBonusePost } = require("../../database/manager/bonuse")
const { vk, questionManager } = require("../../settings/vk")

vk.updates.use(questionManager.middleware)

module.exports = newBonusePost = async (msg) => {

    const bonusePostId = await msg.question('Введите айди поста')

    const sumBonuse = await msg.question('Введите сумму за бонус')

    if (!Number(bonusePostId.text) || !Number(sumBonuse.text)) return msg.send('Ошибка при создании, проверьте вводимые данные')

    msg.send('Успешно сменили бонусный пост')

    addBonusePost(Number(bonusePostId.text), Number(sumBonuse.text))

}