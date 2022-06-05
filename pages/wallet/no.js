const { vkMsg } = require('../../settings/vk')

module.exports = async(msg) => {
    return vkMsg(msg.userId, 'В разработке...')
}
