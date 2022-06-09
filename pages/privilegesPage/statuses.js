const { privilegesBuyButtons } = require('../../keyboards/inline')
const { vkMsgForPrivileges } = require("../../settings/vk")

module.exports = async(msg) => {
return vkMsgForPrivileges(msg.senderId, "", "photo-211465984_457239037", privilegesBuyButtons)
}
