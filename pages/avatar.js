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
                '-209099203_457272397',
                'chack'
            ),
            addElement(
                'Бомб',
                'Для выбора нажмите на кнопку',
                '-209099203_457272399',
                'bomb'
            ),
            addElement(
                'Ред',
                'Для выбора нажмите на кнопку',
                '-209099203_457272398',
                'red'
            ),
            addElement(
                'Стелла',
                'Для выбора нажмите на кнопку',
                '-209099203_457272400',
                'stella'
            ),
        ],
    });

    msg.send({ message: 'Персонажи', template: carouselCases, random_id: getRandomId() })

}
