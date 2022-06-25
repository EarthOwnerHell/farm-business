const businessPage = require('../pages/business/mainPage')
const getLvlOfRefs = require('../pages/refs/lvlsOfRef')
const getProfile = require('../pages/profile')
const howToRectify = require('../howToRectify')
const mainPageWallet = require('../pages/wallet/mainPage')
//const accept = require('../pages/wallet/accept')
const changeQiwi = require('../pages/changeQiwi')
const infoPage = require('../pages/info')
const getTops = require('../pages/top')
const { mainBoard } = require('../keyboards/usual')
const avatar = require('../pages/avatar')
const privileges = require("../pages/privilegesPage/privileges")
const statuses = require("../pages/privilegesPage/statuses")
const changeNick = require("../pages/privilegesPage/changeNick")
const getBonus = require("../pages/privilegesPage/getBonus")
const pets = require("../pages/privilegesPage/pets")
const myPet = require("../pages/privilegesPage/myPet")
const managmentPrivilege = require("../pages/privilegesPage/managmentPrivilege")
const { get } = require('express/lib/request')
const myPetLevel = require("../pages/privilegesPage/myPetLevel")

module.exports = userManager = async (msg) => {

    commands = {

        back: () => msg.send('Главное меню', {
            keyboard: mainBoard(msg.user.admin)
        }),
        profile: () => getProfile(msg),
        changeNick: () => changeNick(msg),
        getBonus: () => getBonus(msg),
        myPet: () => myPet(msg),
        howToRectify: () => howToRectify(msg),
        improvePet: () => myPetLevel(msg),
        managmentPrivilege: () => managmentPrivilege(msg),
        /* Бизнес сторона бота */
        business: () => businessPage(msg),

        /* Реферальная сторона бота */
        getRefsLvl: () => getLvlOfRefs(msg),
        wallet: () => mainPageWallet(msg),
        changeQiwi: () => changeQiwi(msg),
        //accept: () => accept(msg),
        info: () => infoPage(msg),
        topInvested: () => getTops(msg, 'invested'),
        topRef: () => getTops(msg, 'ref.value'),
        changeAvatar: () => avatar(msg),
        pets: () => pets(msg),
        privileges: () => privileges(msg),
        statuses: () => statuses(msg),
    }

    try {
        commands[msg.messagePayload.command]()
    } catch (e) { console.log('--> Не нажали на кнопку User Manager\'a') }

}
