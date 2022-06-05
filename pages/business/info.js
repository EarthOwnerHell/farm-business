const { vkMsg, vk } = require("../../settings/vk")

module.exports = getInfo = (msg) => {


    vk.api.messages.sendMessageEventAnswer({
        event_id: msg.eventId,
        user_id: msg.userId,
        peer_id: msg.peerId,
        event_data: JSON.stringify({
            'type': 'show_snackbar',
            'text': `Информация об точке`
        })
    })

    // console.log(payload)

    const businessInfo = {
        getFirstInfo: '🛒 Магазинчик — небольшой магазин, предназначенный для обеспечения текущих потребностей живущих неподалеку покупателей.',
        getSecondInfo: '🚑 Госпиталь — стационарное медицинское учреждение, направленное на лечение больных.',
        getThirdInfo: '🏘 Мотель — это гостиница, предназначенная для путешественников на автомобилях. Это гибрид парковки и дешёвого придорожного отеля.',
        getFourthInfo: '🎭 Театр — зрелищный вид искусства, представляющий собой синтез различных искусств — литературы, музыки, хореографии, вокала, изобразительного искусства и других, и обладающий собственной спецификой.',
        getFivthInfo: '🏨 Отель — средство размещения, состоящее из определённого количества номеров, имеющее единое руководство, предоставляющее набор услуг: уборка, еда и так далее.',
        getSixthInfo: '✈ Аэропорт — комплекс сооружений, предназначенный для приёма, отправки, базирования воздушных судов и обслуживания воздушных перевозок.',
    }

    vkMsg(msg.userId, businessInfo[msg.eventPayload.infoUpgrade])
    // msg.send(businessInfo[payload])

}
