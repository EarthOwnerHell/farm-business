const { acceptButton } = require('../../keyboards/inline')
const { editPet, setPetExp, setPetLevel } = require('../../database/manager/user')
const { vkMsg, vk } = require('../../settings/vk')

const QiwiBillPaymentsAPI = require('@qiwi/bill-payments-node-js-sdk');
const SECRET_KEY = 'eyJ2ZXJzaW9uIjoiUDJQIiwiZGF0YSI6eyJwYXlpbl9tZXJjaGFudF9zaXRlX3VpZCI6Im5jemhzZy0wMCIsInVzZXJfaWQiOiI3OTAxNjExNTMwNSIsInNlY3JldCI6IjhjMDA2YzI1ZmVkMWQxZDVkNmMyYmViZWM2NjU4YzMwOTA5OTgwMDY0ZjNhNDk5ODRjNjcxOTc5NjUyYzQ3M2YifX0=';
const qiwiApi = new QiwiBillPaymentsAPI(SECRET_KEY);

module.exports = async (msg) => {
   const { id, pet, name } = msg.user
   if (["frog", "fox", "chick", "tiger", "cow", "pig"]
      .includes(msg.messagePayload.pet)) {
    
      if (msg.messagePayload.pet == pet) return msg.send("🐱 У вас уже куплен этот пет")
   
      forAmount = {
         "frog": 0.03,
         "fox": 0.07,
         "chick": 0.12,
         "tiger": 0.18,
         "cow": 0.26,
         "pig": 0.35
     }
     forBeauty = {
        "frog": "🐸",
         "fox": "🦊",
         "chick": "🐤",
         "tiger": "🐅",
         "cow": "🐮",
         "pig": "🐖"
     }
          const lifetime = qiwiApi.getLifetimeByDay(1);
          const billId = qiwiApi.generateId();
      
          const fields = {
              amount: forAmount[msg.messagePayload.pet],
              currency: 'RUB',
              comment: msg.senderId,
              expirationDateTime: lifetime,
          };
      
          qiwiApi.createBill(billId, fields).then(data => {
              vk.api.call("utils.getShortLink", { url: `${data.payUrl}` }).then(function (res) {
                  return msg.send(`&#10145;&#10145;&#10145; ${res.short_url}`,
                      {
                          keyboard: acceptButton
                      }
                  );
              })
          })
      
          const answer = await msg.question(`
💰 Сумма к оплате: ${forAmount[msg.messagePayload.pet]} ₽
🐱 Перейдите по ссылке ниже для оплаты пета.
❕После оплаты нажмите на кнопку «✅».
            
❗Для отмена покупки напишите любое слово`);
      
          if (!/✅/i.test(answer.text)) {
              await msg.send(`
      ❗ Отмена.`);
      
              return;
          }
          await qiwiApi.getBillInfo(billId).then(data => {
              if (data.status.value == 'PAID' && data.comment == msg.senderId && data.amount.currency == 'RUB') {
           editPet(id, msg.messagePayload.pet)
           setPetExp(id, 0)
           setPetLevel(id, 0)
           msg.send(`${forBeauty[msg.messagePayload.pet]} Успешная покупка пета`)
           return vkMsg(297789589, `https://vk.com/id${msg.senderId} купил пета`)
}
})
}
}
