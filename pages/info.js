const { getGlobal } = require('../database/manager/global');
const { Users } = require('../database/models');
const { topBoard } = require('../keyboards/inline');
const { numberWithSpace } = require('../tools');
const { vk } = require('../settings/vk')

module.exports = infoPage = async (msg) => {
    const users = await Users.find({});

    const { count } = await vk.api.messages.getDialogs({ count: 1 });

    let allWithdraw = 0;
    let allInvested = 0;

    users.forEach(({ withdrawnBalance, invested }) => {
        allInvested += invested;
        allWithdraw += withdrawnBalance;
    });

    msg.send(
        `🖥 Наша статистика:\n\n🔗 Пользователей: ${numberWithSpace(
            count
        )}\n🤝 Всего рефералов: ${numberWithSpace(
            users.filter((x) => x.ref.refferer !== 222856843).length
        )}\n\n💳 Инвестировано: ${numberWithSpace(
            allInvested
        )} $\n\n💵 Всего заработано: ${numberWithSpace(
            allWithdraw 
        )} $\n🤑 Всего выведено: ${numberWithSpace(allWithdraw / 16000)}₽`,
        {
            keyboard: topBoard,
        }
    );
};
