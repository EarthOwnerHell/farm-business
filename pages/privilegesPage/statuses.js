const { privilegesBuyButtons } = require('../../keyboards/inline')
const { vkMsgForPrivileges } = require("../../settings/vk")

module.exports = async(msg) => {
return vkMsgForPrivileges(msg.senderId, "", "photo-209099203_457272401", privilegesBuyButtons)
}
