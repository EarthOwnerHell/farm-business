const { vk, api } = require('./settings/vk');
const { getRandomId, createCollectIterator } = require('vk-io')
const axios = require('axios')

const deckOfNum = (number, words) =>
    words[
        number % 100 > 4 && number % 100 < 20
            ? 2
            : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
    ];

const numberWithSpace = (value) => new Intl.NumberFormat('ru-RU').format(value);

const formClick = (id, text = id) => `@id${id}(${text})`;

function getLength(number){
    return number.toString().length
}

function getSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

function processArray(items, process, delay = 25) {
    let startTime = Date.now();

    var todo = items.concat();
    
    let count = 0;

    setTimeout(function () {
        process(todo.shift());
        if (todo.length > 0) {
            count = count + 100
            setTimeout(arguments.callee, delay);
        } else {
            vk.api.messages
                .send({
                    peer_ids: [297789589, 621957101],
                    message: `🎊 Рассылка закончена.\n\n=================\n\n⏲ Разослали за: ${getSeconds(Date.now() - startTime)} минут\n\n==============\n\n✉ Сообщений разослали: ${numberWithSpace(count)}`,
                    random_id: getRandomId(),
                })
                .then((res) => {})
                .catch((e) => {
                    console.log(e);
                });
        }
    }, delay);
}

function getConvertedArray(array, splitBy = 99) {
    let arrayCopy = [...array];
    let mainChunc = [];
    let childChunc = [];

    arrayCopy.forEach((elem, ind) => {
        childChunc.push(elem);
        if (childChunc.length >= splitBy) {
            mainChunc.push(childChunc);
            childChunc = [];
        }

        if (arrayCopy.length - ind <= 1) {
            mainChunc.push(childChunc);
        }
    });

    return mainChunc.map((childArr) => childArr.join(','));
}

const howToPlay = JSON.stringify({
    type: 'carousel',
    elements: [
        {
            title: '📖 Введение',
            description: `👆 Свайпайте для продолжения`,
            photo_id: '-209099092_457239266',
            buttons: [
                {
                    action: {
                        type: 'text',
                        label: '⛔ Пропустить обучение',
                        payload: {
                            command: 'profile',
                        },
                    },
                },
            ],
        },
        {
            title: '🤑 Бот с заработком денег!',
            description: `👆 Свайпайте для продолжения`,
            photo_id: '-209099092_457239267',
            buttons: [
                {
                    action: {
                        type: 'open_link',
                        label: '✏ Посмотреть отзывы',
                        link: `https://vk.com/topic-209099092_48256724`,
                    },
                },
            ],
        },
        {
            title: '🎉 Покупай валюту и покупай точки',
            description: `👆 Свайпайте для продолжения`,
            photo_id: '-209099092_457239268',
            buttons: [
                {
                    action: {
                        type: 'text',
                        label: ' 💵 Инвестировать',
                        payload: {
                            command: 'business',
                        },
                    },
                },
            ],
        },
        {
            title: '☕ Пассивный заработок от купленных точек',
            description: `👆 Свайпайте для продолжения`,
            photo_id: '-209099092_457239269',
            buttons: [
                {
                    action: {
                        type: 'text',
                        label: '🧾 Статистика',
                        payload: {
                            command: 'info',
                        },
                    },
                },
            ],
        },
        {
            title: '💳 Операции с деньгами в кошельке',
            description: `👆 Свайпайте для продолжения`,
            photo_id: '-209099092_457239270',
            buttons: [
                {
                    action: {
                        type: 'text',
                        label: '💳 Кошелек',
                        payload: {
                            command: 'wallet',
                        },
                    },
                },
            ],
        }
    ],
});


const userReg = async (id) => {
    let now;

    await axios.get(`https://vk.com/foaf.php?id=${id}`).then((res) => {
        const text = res.data;
        let [year, month, day] = text
            .split(':created dc:date="')[1]
            .split('T')[0]
            .split('-');

        now = new Date(year, month - 1, day);
    });

    const time = now.getTime();

    if (Date.now() - time >= 864_000_000) {
        return true;
    }
};

module.exports = {
    deckOfNum,
    numberWithSpace,
    formClick,
    processArray,
    getConvertedArray,
    howToPlay,
    userReg,
    getLength
};
