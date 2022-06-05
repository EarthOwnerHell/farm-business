const { getRandomId } = require('vk-io')
const { groupId } = require('../../settings/config.json')


module.exports = pets = async (msg) => {
    const carouselCases = JSON.stringify({
        type: 'carousel',
        elements: [
            {
                title: 'Кролик',
                description: `79 ₽ 🐇`,
                photo_id: '-209099203_457288738',
                buttons: [
                    {
                        action: {
                            type: 'callback',
                            label: '💴 Купить',
                            payload: {
                                pet: 'rabbit',
                            },
                        },
                    },
                ],
            },
            {
                title: 'Оленёнок',
                description: `169 ₽ 🦌`,
                photo_id: '-209099203_457288739',
                buttons: [
                    {
                        action: {
                            type: 'callback',
                            label: '💴 Купить',
                            payload: {
                                pet: 'deer',
                            },
                        },
                    },
                ],
            },
                       {
                title: 'Коала',
                description: `259 ₽ 🐨`,
                photo_id: '-209099203_457288740',
                buttons: [
                    {
                        action: {
                            type: 'callback',
                            label: '💴 Купить',
                            payload: {
                                pet: 'coala',
                            },
                        },
                    },
                ],
            },
             {
                title: 'Пингвин',
                description: `349 ₽ 🐧`,
                photo_id: '-209099203_457288741',
                buttons: [
                    {
                        action: {
                            type: 'callback',
                            label: '💴 Купить',
                            payload: {
                                pet: 'penguin',
                            },
                        },
                    },
                ],
            },
            {
                title: 'Собака',
                description: `439 ₽ 🐕`,
                photo_id: '-209099203_457288742',
                buttons: [
                    {
                        action: {
                            type: 'callback',
                            label: '💴 Купить',
                            payload: {
                                pet: 'dog',
                            },
                        },
                    },
                ],
            },
            {
                title: 'Кот',
                description: `529 ₽ 🐈`,
                photo_id: '-209099203_457288743',
                buttons: [
                    {
                        action: {
                            type: 'callback',
                            label: '💴 Купить',
                            payload: {
                                pet: 'cat',
                            },
                        },
                    },
                ],
            },
        ],
    });

    msg.send({ message: '🐱 Выбирай себе пета!', template: carouselCases, random_id: getRandomId() }) 
}
