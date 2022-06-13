const { getRandomId } = require('vk-io')
const { groupId } = require('../../settings/config.json')


module.exports = pets = async (msg) => {
    const carouselCases = JSON.stringify({
        type: 'carousel',
        elements: [
            {
                title: 'Лягух',
                description: `79 ₽ 🐸`,
                photo_id: '-211465984_457239038',
                buttons: [
                    {
                        action: {
                            type: 'callback',
                            label: '💴 Купить',
                            payload: {
                                pet: 'frog',
                            },
                        },
                    },
                ],
            },
            {
                title: 'Лиса',
                description: `169 ₽ 🦊`,
                photo_id: '-211465984_457239039',
                buttons: [
                    {
                        action: {
                            type: 'callback',
                            label: '💴 Купить',
                            payload: {
                                pet: 'fox',
                            },
                        },
                    },
                ],
            },
                       {
                title: 'Птенец',
                description: `259 ₽ 🐤`,
                photo_id: '-211465984_457239040',
                buttons: [
                    {
                        action: {
                            type: 'callback',
                            label: '💴 Купить',
                            payload: {
                                pet: 'chick',
                            },
                        },
                    },
                ],
            },
             {
                title: 'Тигр',
                description: `349 ₽ 🐅`,
                photo_id: '-211465984_457239041',
                buttons: [
                    {
                        action: {
                            type: 'callback',
                            label: '💴 Купить',
                            payload: {
                                pet: 'tiger',
                            },
                        },
                    },
                ],
            },
            {
                title: 'Коровка',
                description: `439 ₽ 🐮`,
                photo_id: '-211465984_457239042',
                buttons: [
                    {
                        action: {
                            type: 'callback',
                            label: '💴 Купить',
                            payload: {
                                pet: 'cow',
                            },
                        },
                    },
                ],
            },
            {
                title: 'Свинка',
                description: `529 ₽ 🐷`,
                photo_id: '-211465984_457239043',
                buttons: [
                    {
                        action: {
                            type: 'callback',
                            label: '💴 Купить',
                            payload: {
                                pet: 'pig',
                            },
                        },
                    },
                ],
            },
        ],
    });

    msg.send({ message: '🐱 Выбирай себе пета!', template: carouselCases, random_id: getRandomId() }) 
}
