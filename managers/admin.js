const { adminMenu } = require("../keyboards/usual")
const buyCourse = require("../pages/admin/buyCourse")
const giveBalance = require("../pages/admin/giveBalance")
const giveBan = require("../pages/admin/giveBan")
const giveUnban = require("../pages/admin/giveUnban")
const hackPercent = require("../pages/admin/hackPercent")
const mailing = require("../pages/admin/mailing")
const newBonusePost = require("../pages/admin/newBonusePost")
const givePrivilege = require("../pages/admin/givePrivilege")
const givePet = require("../pages/admin/givePet")
const giveUnbanWithdrawn = require("../pages/admin/giveUnbanWithdrawn")
const forRef = require("../pages/admin/forRef")
const makeUnactive = require("../pages/admin/makeUnactive")

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
        givePrivilege: () => givePrivilege(msg),
        givePet: () => givePet(msg),
        forRef: () => forRef(msg),
        giveUnban: () => giveUnban(msg),
        giveUnbanWithdrawn: () => giveUnbanWithdrawn(msg),
        makeUnactive: () => makeUnactive(msg)
    };

    try {
        commands[msg.messagePayload.admin]()
    } catch (e) { console.log(e) }

}
