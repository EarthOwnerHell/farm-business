const { set } = require('express/lib/application');
const { plusBalanceUser, setTolya } = require('../../database/manager/user');
const { vk, questionManager, getId, vkMsg } = require('../../settings/vk');
const { formClick, numberWithSpace } = require('../../tools');

vk.updates.use(questionManager.middleware);

module.exports = giveBan = async (msg) => {
    const userUrl = await msg.question('Вставьте ссылку на профиль');

    const userId = await getId(userUrl.text);

    if (!userId.id || userId.type !== 'user')
        return msg.send('Ошибка, проверь вводимые данные');

    const plusBalance = await msg.question('Введите сумму, которую надо прибавить. (Для вычитания добавь перед числом минус)')
    
    msg.send(`Успешно выдали ${formClick(userId.id, 'челу')} балик в размере ${numberWithSpace(Number(plusBalance.text))}`);
    vkMsg(
        userId.id,
        `
🔮 Время бонусов!

🎁 Вам начислено: ${numberWithSpace(Number(plusBalance.text))} $ !!!

🤑 Получай больше бонусов
за подписку, лайки и комментарии в нашем сообществе!`
    );

    plusBalanceUser(userId.id, Number(plusBalance.text));
    setTolya(userId.id)
};
