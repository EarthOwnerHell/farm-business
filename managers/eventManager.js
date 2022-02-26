const mainPageRefs = require("../pages/refs/mainPageRefs");
const setAvatar = require("../pages/setAvatar");
const withdrawnMoney = require("../pages/wallet/withdrawn");


module.exports = eventManager = (msg) => {
    const commands = {
        refs: () => mainPageRefs(msg),
        withdrawn: () => withdrawnMoney(msg),
        stella: () => setAvatar(msg, 1),
        bomb: () => setAvatar(msg, 2),
        red: () => setAvatar(msg, 3),
        chack: () => setAvatar(msg, 4)
    }

    try {
        commands[msg.eventPayload.command]();
    } catch (e) {

    }
}