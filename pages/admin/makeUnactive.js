const { setUnactive } = require("../../database/manager/bonuse")
const { vk, questionManager } = require("../../settings/vk")

vk.updates.use(questionManager.middleware)

module.exports = async (msg) => {

    const bonusePostId = await msg.question('Введите айди поста')

    if (!Number(bonusePostId.text)) return msg.send('Ошибка при создании, проверьте вводимые данные')

    msg.send('Успешно уменьшен бонус за репост')

    setUnactive(Number(bonusePostId.text))

}
