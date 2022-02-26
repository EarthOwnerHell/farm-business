const { VK, getRandomId, resolveResource } = require('vk-io');
const { token } = require('./config.json')
const { QuestionManager } = require('vk-io-question');

const vk = new VK({
    token
})

const questionManager = new QuestionManager();

const { api } = vk

const vkMsg = (peer_id, message, attachment) => (
    api.messages.send({
        peer_id,
        message,
        attachment,
        random_id: getRandomId()
    })
)

const vkMsgKeyboard = (peer_id, message, keyboard) => (
    api.messages.send({
        peer_id,
        message,
        keyboard,
        random_id: getRandomId()
    })
)

const getVkNameById = async (id) => {
    const [data] = await api.users.get({
        user_ids: id,
    });
    return data.first_name;
}

const getId = async (resource) => await resolveResource({  api, resource, });

module.exports = {
    api,
    vk,
    vkMsg,
    getVkNameById,
    vkMsgKeyboard,
    questionManager,
    getId,
}