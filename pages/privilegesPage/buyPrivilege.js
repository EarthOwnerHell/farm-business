const { acceptButton } = require('../../keyboards/inline')
const { editSymbol, editPrivilege, setLastGetBonuses } = require('../../database/manager/user')
const { vkMsg, vk } = require('../../settings/vk')

const QiwiBillPaymentsAPI = require('@qiwi/bill-payments-node-js-sdk');
const SECRET_KEY = 'eyJ2ZXJzaW9uIjoiUDJQIiwiZGF0YSI6eyJwYXlpbl9tZXJjaGFudF9zaXRlX3VpZCI6Im5jemhzZy0wMCIsInVzZXJfaWQiOiI3OTAxNjExNTMwNSIsInNlY3JldCI6IjhjMDA2YzI1ZmVkMWQxZDVkNmMyYmViZWM2NjU4YzMwOTA5OTgwMDY0ZjNhNDk5ODRjNjcxOTc5NjUyYzQ3M2YifX0=';
const qiwiApi = new QiwiBillPaymentsAPI(SECRET_KEY);

module.exports = async (msg) => {
   const { id, privilege, name } = msg.user
   if (["elit", "investor", "businessGig"]
      .includes(msg.messagePayload.privilege)) {
    
      if (msg.messagePayload.privilege == privilege) return msg.send("😎 У вас уже куплена эта привелегия")
   
      forAmount = {
         "elit": 259,
         "investor": 399,
         "businessGig": 799
     }
          const lifetime = qiwiApi.getLifetimeByDay(1);
          const billId = qiwiApi.generateId();
      
          const fields = {
              amount: forAmount[msg.messagePayload.privilege],
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
💰 Сумма к оплате: ${forAmount[msg.messagePayload.privilege]} ₽

🥸 Перейдите по ссылке ниже для оплаты привилегии.
❕После оплаты нажмите на кнопку «✅».
            
❗Для отмена покупки напишите любое слово`);
      
          if (!/✅/i.test(answer.text)) {
              await msg.send(`
      ❗ Отмена.`);
      
              return;
          }
          await qiwiApi.getBillInfo(billId).then(data => {
              if (data.status.value == 'PAID' && data.comment == msg.senderId && data.amount.currency == 'RUB') {
               
               forEdit = {
               "259.00": "elit",
               "399.00": "investor",
               "799.00": "businessGig"
           }
           forText = {
            "259.00": "Элита",
            "399.00": "Инвестор",
            "799.00": "Бизнес-Гигант"
        }
           editPrivilege(msg.senderId, forEdit[data.amount.value])
           editSymbol(msg.senderId, forPrivSymbol[data.amount.value])
           setLastGetBonuses(msg.senderId)
           msg.send(`✅✅✅ Успешная покупка привилегии <<${forText[data.amount.value]}>> !\n💫 Забирать бонусы можно через кнопку <<Профиль>>`)
           vkMsg(621957101, `https://vk.com/id${msg.senderId} купил привилегию`)
           return vkMsg(297789589, `https://vk.com/id${msg.senderId} купил привилегию`)
}
})
}
}
