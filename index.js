const userManager = require('./managers/user');
const eventManager = require('./managers/eventManager');
const connectDb = require('./database/connect');
const adminManager = require('./managers/admin');
const newDonate = require('./settings/keksik.js');

const {
    getUser,
    createUser,
    plusBalanceUser,
    minusBalanceUser,
    plusBusinessUser,
    minusBusinessUser,
} = require('./database/manager/user');

const { vk, getVkNameById, vkMsg } = require('./settings/vk');
const { mainBoard } = require('./keyboards/usual');
const { autoCreateGlobal } = require('./database/manager/global');
const { getBonusePost, addUserRepost } = require('./database/manager/bonuse');
const { numberWithSpace, userReg } = require('./tools');
const { getRandomId } = require('vk-io');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const v = 1;

/*const app = express();

app.use(cors());

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(bodyParser.json());

app.post('/api', (res, req) => {
    console.log(res.body);

    if (res.body.type == 'confirmation') {
        req.send(JSON.stringify({ status: 'ok', code: '9a65a7' }));
    } else {
        req.send(JSON.stringify({ status: 'ok' }));

        if (res.body.type == 'new_donate') {
            const { id, user, amount } = res.body.donate;

            newDonate(Number(id), Number(user), Number(amount));
        }
    }
    // req.json( { ok: 228 } )
});

app.listen(5000, () => console.log('--> Сервер включен...'));
*/

connectDb();

autoCreateGlobal();

vk.updates.on('like_add', async (msg) => {
    if (msg.objectType == 'photo') return;

    vkMsg(msg.likerId, `❤ Спасибо за лайк!\n\n🤑 Вы заработали 25 $`);

    plusBalanceUser(msg.likerId, 25);
});

vk.updates.on('like_remove', async (msg) => {
    if (msg.objectType == 'photo') return;

    vkMsg(
        msg.likerId,
        `🙁 Нам жаль, но вы убрали лайк, мы снимаем с вашего баланса 25 $`
    );

    minusBalanceUser(msg.likerId, 25);
});

vk.updates.on('wall_repost', async (msg) => {
    const post = await getBonusePost(msg.wall.copyHistory[0].id);

    if (!post) return;

    if (post.reposts.includes(msg.wall.ownerId)) return;

    vkMsg(
        msg.wall.ownerId,
        `🎁 Спасибо за репост!\n\n🤑 Вы заработали ${numberWithSpace(
            post.sumBonuseRepost
        )} $`
    );

    addUserRepost(msg.wall.copyHistory[0].id, msg.wall.ownerId);
    plusBalanceUser(msg.wall.ownerId, post.sumBonuseRepost);
});

vk.updates.on('wall_reply_new', async (msg) => {
    vkMsg(msg.fromId, '✉ Спасибо за комментарий!\n\n🤑 Вы заработали 40 $');
    plusBalanceUser(msg.fromId, 40);
});

vk.updates.on('wall_reply_delete', async (msg) => {
    vkMsg(
        msg.deleterUserId,
        '🙁 Нам жаль, но вы убрали комментарий, мы снимаем с вашего баланса 40 $'
    );
    minusBalanceUser(msg.deleterUserId, 40);
});

vk.updates.on('group_join', async (msg) => {
    vkMsg(msg.userId, '🎊 Спасибо за подписку, мы дарим вам бонусную точку!');
    plusBusinessUser(msg.userId, 'market');
});

vk.updates.on('group_leave', async (msg) => {
    const user = await getUser(msg.userId);

    if (!user) return;

    if (!user.businesses.market) return;

    vkMsg(
        msg.userId,
        '🙁 Нам жаль, но вы отписались, мы сняли бонусную точку!('
    );
    minusBusinessUser(msg.userId);
});

try {
    vk.updates.on('message_new', async (msg) => {
        if (msg.isChat) return;

        const reg = await userReg(msg.senderId);

        if (!reg) return;

        msg.user = await getUser(msg.senderId);

        // if (!msg.user.admin) return

        if (!msg.user) {
            msg.send('👨‍🌾 Привет! Это твоя онлайн-ферма с заработком реальных денег. Нажимай по кнопкам. ', {
                keyboard: mainBoard(false),
            });

            const name = await getVkNameById(msg.senderId);

            const newUser = await createUser({
                id: msg.senderId,
                name: name
            });
        }

        if (msg.user?.ban) return msg.send('Вы были забанены.');
    
        if (['меню', 'начать', 'главное меню'].includes(msg.text.toLowerCase()))
            return msg.send('Главное меню', {
                keyboard: mainBoard(msg.user.admin),
            });
        
        if (msg.messagePayload?.command) return userManager(msg);

        if (msg.messagePayload?.admin && msg.user.admin)
            return adminManager(msg);
    });
} catch (e) {
    console.log(e);
}

vk.updates.on('message_event', async (msg) => {
    msg.user = await getUser(msg.userId);

    if (msg.user?.ban) return vkMsg(msg.userId, 'Вы были забанены.');

    if (msg.eventPayload.command) {
        eventManager(msg);
    }

    // console.log(msg.eventPayload)
});

vk.updates.start().then(console.log('--> Бот запущен.'));
