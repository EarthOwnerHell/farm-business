const { privilegesBuyButtons } = require('../../keyboards/inline')
const { vkMsgForPrivileges } = require("../../settings/vk")

module.exports = async(msg) => {
return vkMsgForPrivileges(msg.senderId, "", "photo-209099092_457239196", privilegesBuyButtons)
}
