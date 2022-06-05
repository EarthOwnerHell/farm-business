const { privilegesKeyboard, privilegesBuyButtons } = require('../../keyboards/inline')
const { vkMsgForPrivileges } = require("../../settings/vk")

module.exports = async(msg) => {
return msg.send("💴 Хотите что-то приобрести?", {keyboard: privilegesKeyboard})
//return vkMsgForPrivileges(msg.senderId, "", "photo-209099203_457272401", privilegesBuyButtons)
}
