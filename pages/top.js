const { getTop } = require("../database/manager/user");
const { vkMsg } = require("../settings/vk");
const { formClick, numberWithSpace } = require("../tools");




module.exports = getTops = async (msg, payload) => {

    if (payload === 'invested') {

        let res;
        let statText;

        const icons = {
            0: '🥇',
            1: '🥈',
            2: '🥉',
            3: '4⃣',
            4: '5⃣',
            5: '6⃣',
            6: '7⃣',
            7: '8⃣',
            8: '9⃣',
            9: '🔟',
        }

        res = await getTop(payload)
        statText = '💎Топ вложений:\n\n\n';

        res.forEach(async ({ id, name, invested, forTopSymbol }, index) => {
            statText += `${icons[index] ? icons[index] : index + 1} ${formClick(id, name)} ➔ ${numberWithSpace(invested)} $ ${forTopSymbol}\n`
        });

        return msg.send(statText)

    }

    if (payload === 'ref.value') {
        let res;
        let statText;

        const icons = {
            0: '🥇',
            1: '🥈',
            2: '🥉',
            3: '4⃣',
            4: '5⃣',
            5: '6⃣',
            6: '7⃣',
            7: '8⃣',
            8: '9⃣',
            9: '🔟',
        }

        res = await getTop(payload)
        statText = '💎Топ рефералов:\n\n\n';

        res.forEach(async ({ id, name, ref: { value }, forTopSymbol }, index) => {
            statText += `${icons[index] ? icons[index] : index + 1} ${formClick(id, name)} ➔ ${numberWithSpace(value)} рефералов ${forTopSymbol}\n`
        });

        return msg.send(statText)
    }

}