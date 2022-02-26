const { setBuyCourse } = require('../../database/manager/global');
const { plusBalanceUser } = require('../../database/manager/user');
const { vk, questionManager, getId } = require('../../settings/vk');
const { formClick, numberWithSpace } = require('../../tools');

vk.updates.use(questionManager.middleware);

module.exports = giveBan = async (msg) => {
    const newCourse = await msg.question('Напиши новый курс, черт');

    msg.send(`Успешно сменили курс на ${numberWithSpace(Number(newCourse.text))}`);

    setBuyCourse(Number(newCourse.text))
};
