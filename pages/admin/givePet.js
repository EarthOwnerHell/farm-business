const { editPet, setPetExp, setPetLevel } = require('../../database/manager/user')
const { getId, vkMsg } = require('../../settings/vk');

module.exports = async(msg) => {
const userUrl = await msg.question('Вставьте ссылку на профиль');

    const userId = await getId(userUrl.text);

    if (!userId.id || userId.type !== 'user') return msg.send('Ошибка, проверь вводимые данные');
   
    const setPet = await msg.question('Введите пета (coala, deer, penguin, cat, dog, rabbit):')
    
    const checkPet = String(setPet.text)
    msg.send(`Успешно выдали https://vk.com/id${userId.id} челу`)
    editPet(userId.id, checkPet)
    setPetExp(userId.id, 0)
    setPetLevel(userId.id, 0);
}
