const { getRandomId } = require("vk-io")




module.exports = chooseAvatar = (msg) => {

    const addElement = (title, description, photo_id, payload) => ({
        title,
        description,
        photo_id,
        "buttons": [{
            "action": {
                "type": "callback",
                "label": "🌝 Сменить персонажа",
                "payload": {
                    command: payload
                }
            },
        }]
    })

    const carouselCases = JSON.stringify({
        type: 'carousel',
        elements: [
            addElement(
                'Чак',
                'Для выбора нажмите на кнопку',
                '-209099092_457239086',
                'chack'
            ),
            addElement(
                'Бомб',
                'Для выбора нажмите на кнопку',
                '-209099092_457239087',
                'bomb'
            ),
            addElement(
                'Ред',
                'Для выбора нажмите на кнопку',
                '-209099092_457239088',
                'red'
            ),
            addElement(
                'Стелла',
                'Для выбора нажмите на кнопку',
                '-209099092_457239089',
                'stella'
            ),
        ],
    });

    msg.send({ message: 'Персонажи', template: carouselCases, random_id: getRandomId() })

}