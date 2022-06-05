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

const msg = (props) => {

    const { peer_id, message, attachment, keyboard } = props

    api.messages.send({
        peer_id,
        message,
        attachment,
        keyboard,
        random_id: getRandomId()
    })

}

const vkMsgForPrivileges = (peer_id, message, attachment, keyboard) => (
    api.messages.send({
        peer_id,
        message,
        attachment,
        random_id: getRandomId(),
        keyboard: keyboard
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

const messageEdit = (props) => {
    let { peer_id, message_id, message } = props

    api.messages.edit({
        peer_id,
        message_id,
        message
    }).catch((e) => {
        console.log(e)
        message += `\n\n❗ Что-то пошло не так, отправили вам сообщение`

        msg({ peer_id, message })
    })

} 

const getLastBotMessage = async (userId) => {
    const { items } = await api.messages.getHistory({
        count: 1,
        user_id: userId,
        peer_id: userId,
        start_message_id: -1,
    })

    const { id } = items[0]

    return id
}

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
    vkMsgForPrivileges,
    messageEdit,
    getLastBotMessage
}
