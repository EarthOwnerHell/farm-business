const { editPrivilege, editSymbol, setLastGetBonuses } = require('../../database/manager/user')
const { getId, vkMsg } = require('../../settings/vk');

module.exports = async(msg) => {
const userUrl = await msg.question('Вставьте ссылку на профиль');

    const userId = await getId(userUrl.text);

    if (!userId.id || userId.type !== 'user') return msg.send('Ошибка, проверь вводимые данные');
   
    const setPrivilege = await msg.question('Введите привилегию')
    
    const checkPriv = String(setPrivilege.text)
    msg.send(`Успешно выдали https://vk.com/id${userId.id} челу`)
    forPrivSymbol = {
                  "elit": "⭐",
                  "investor": '🔥',
                  "businessGig": '🎩'
              }
           editSymbol(userId.id, forPrivSymbol[checkPriv])
    setLastGetBonuses(userId.id)
    editPrivilege(userId.id, checkPriv);
}
