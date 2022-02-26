const { adminMenu } = require("../keyboards/usual")
const buyCourse = require("../pages/admin/buyCourse")
const giveBalance = require("../pages/admin/giveBalance")
const giveBan = require("../pages/admin/giveBan")
const hackPercent = require("../pages/admin/hackPercent")
const mailing = require("../pages/admin/mailing")
const newBonusePost = require("../pages/admin/newBonusePost")
const givePrivilege = require("../pages/admin/givePrivilege")



module.exports = adminManager = async (msg) => {

    commands = {
        admin: () =>
            msg.send('Админ меню', {
                keyboard: adminMenu,
            }),
        newBonus: () => newBonusePost(msg),
        mailing: () => mailing(msg),
        hackPercent: () => hackPercent(msg),
        giveBan: () => giveBan(msg),
        giveBalance: () => giveBalance(msg),
        courseBuy: () => buyCourse(msg),
        givePrivilege: () => givePrivilege(msg)
    };

    try {
        commands[msg.messagePayload.admin]()
    } catch (e) { console.log(e) }

}
